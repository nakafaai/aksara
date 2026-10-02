import type { QuestionResponseSource } from "@nakafa/aksara-contracts/question/item";
import { compareCodeUnits } from "@nakafa/aksara-contracts/text/order";
import { Effect, Predicate } from "effect";
import {
  type QuestionPrompt,
  readQuestionPrompts,
} from "#corpus/question-bank/prompt";
import type { QuestionSource } from "#corpus/question-bank/source";

const METADATA_PATTERN = /^export const metadata = \{[\s\S]*?\};\s*/u;
const MATH_ATTRIBUTE_PATTERN = /math="([^"]*)"/gu;
const TAG_PATTERN = /<[^>]+>/gu;
const PARAGRAPH_PATTERN = /\n\s*\n/u;
const COMMAND_PATTERN = /\\([a-z]+)/gu;
const SYMBOL_PATTERN = /[{}()[\]$^_=+\-*/,.;:!?"'`|<>“”„‘’]/gu;
const NUMBER_PATTERN = /\d+/gu;
const SPACE_PATTERN = /\s+/u;
const SHINGLE_SIZE = 3;
const PASSAGE_WORDS = 25;
const MASKED_FLOOR = 0.8;
const EXACT_FLOOR = 0.25;
const COMMON_SHINGLE = 64;

/** Word 3-gram shingles of one text, as written and with numbers masked. */
interface Print {
  readonly exact: ReadonlySet<string>;
  readonly masked: ReadonlySet<string>;
}

/** One pair of questions or passages that read too much alike. */
export interface SimilarityMatch {
  readonly exact: number;
  readonly first: string;
  readonly masked: number;
  readonly score: number;
  readonly second: string;
}

/** Every item and passage pair at or above the threshold, highest first. */
export interface SimilarityReport {
  readonly items: readonly SimilarityMatch[];
  readonly passages: readonly SimilarityMatch[];
}

/** One prompt with its own wording separated from the passage it shares. */
interface Unit {
  readonly full: Print;
  readonly id: number;
  readonly locale: string;
  readonly own: Print;
  readonly root: string;
  readonly set: string;
  readonly stimulus: readonly string[];
}

/** Splits one text into comparable words, optionally masking every number. */
function words(text: string, mask: boolean) {
  const spaced = text
    .toLowerCase()
    .replace(COMMAND_PATTERN, " \\$1 ")
    .replace(SYMBOL_PATTERN, " ");
  const masked = mask ? spaced.replace(NUMBER_PATTERN, "#") : spaced;
  return masked.split(SPACE_PATTERN).filter((word) => word.length > 0);
}

/** Collects the word 3-gram shingles of one word list. */
function shingles(list: readonly string[]): ReadonlySet<string> {
  if (list.length <= SHINGLE_SIZE) {
    return new Set([list.join(" ")]);
  }
  return new Set(
    list
      .slice(SHINGLE_SIZE - 1)
      .map((_, index) => list.slice(index, index + SHINGLE_SIZE).join(" "))
  );
}

/** Prints one text in both comparison forms. */
function print(text: string): Print {
  return {
    exact: shingles(words(text, false)),
    masked: shingles(words(text, true)),
  };
}

/** Measures the shared share of two non-empty shingle sets. */
function jaccard(left: ReadonlySet<string>, right: ReadonlySet<string>) {
  const shared = [...left].filter((shingle) => right.has(shingle)).length;
  return shared / (left.size + right.size - shared);
}

/** Scores two prints; a masked match counts only when the wording overlaps. */
function score(first: string, left: Print, second: string, right: Print) {
  const exact = jaccard(left.exact, right.exact);
  const masked = jaccard(left.masked, right.masked);
  const counted = masked >= MASKED_FLOOR && exact >= EXACT_FLOOR;
  return {
    exact,
    first,
    masked,
    score: counted ? Math.max(exact, masked) : exact,
    second,
  };
}

/** Reads the visible paragraphs of one prompt, math included. */
function paragraphs(rawMdx: string) {
  return rawMdx
    .replace(METADATA_PATTERN, "")
    .replace(MATH_ATTRIBUTE_PATTERN, " $1 ")
    .replace(TAG_PATTERN, " ")
    .split(PARAGRAPH_PATTERN)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}

/** Lists every option, category, and statement a learner reads with the prompt. */
function labels(response: QuestionResponseSource): readonly string[] {
  if (response.kind === "category") {
    return [
      ...response.categories,
      ...response.statements.map(({ label }) => label),
    ];
  }
  if (response.kind === "rubric" || response.kind === "short-answer") {
    return [];
  }
  return response.options.map(({ label }) => label);
}

/** Names the set directory that owns one question directory. */
function setOf(root: string) {
  return root.slice(0, root.lastIndexOf("/"));
}

/** Separates each prompt's shared passage from its own question wording. */
function units(prompts: readonly QuestionPrompt[]) {
  const groups = new Map<string, QuestionPrompt[]>();
  for (const prompt of prompts) {
    const key = `${setOf(prompt.source.sourceRoot)}\n${prompt.locale}`;
    groups.set(key, [...(groups.get(key) ?? []), prompt]);
  }
  return [...groups.values()].flatMap((members) => {
    const read = members.map((prompt) => ({
      list: paragraphs(prompt.rawMdx),
      prompt,
    }));
    const counts = new Map<string, number>();
    for (const part of read.flatMap(({ list }) => [...new Set(list)])) {
      counts.set(part, (counts.get(part) ?? 0) + 1);
    }
    /** A paragraph is shared unless exactly one prompt in the set uses it. */
    const isShared = (part: string) => counts.get(part) !== 1;
    return read.map(({ list, prompt }): Omit<Unit, "id"> => {
      const answers = Object.values(prompt.source.item.responses)
        .filter(Predicate.isNotUndefined)
        .flatMap(labels);
      const own = list.filter((part) => !isShared(part));
      return {
        full: print([...list, ...answers].join(" ")),
        locale: prompt.locale,
        own: print([...own, ...answers].join(" ")),
        root: prompt.source.sourceRoot,
        set: setOf(prompt.source.sourceRoot),
        stimulus: list.filter(isShared),
      };
    });
  });
}

/** Adds one unit to the list kept under one key. */
function collect(map: Map<string, Unit[]>, key: string, unit: Unit) {
  const list = map.get(key);
  if (list === undefined) {
    map.set(key, [unit]);
    return;
  }
  list.push(unit);
}

/** Lists each unordered pair of one group once when either side is a target. */
function pairs<Item>(
  group: readonly Item[],
  isTarget: (item: Item) => boolean
) {
  return group.flatMap((left, index) =>
    group
      .slice(index + 1)
      .filter((right) => isTarget(left) || isTarget(right))
      .map((right) => ({ left, right }))
  );
}

/** Compares siblings by their own wording and other sets by the whole item. */
function itemMatches(
  all: readonly Unit[],
  isTarget: (root: string) => boolean,
  threshold: number
) {
  const siblings = new Map<string, Unit[]>();
  const shared = new Map<string, Unit[]>();
  for (const unit of all) {
    collect(siblings, `${unit.set}\n${unit.locale}`, unit);
    for (const shingle of unit.full.masked) {
      collect(shared, `${unit.locale}\n${shingle}`, unit);
    }
  }
  const groups = [
    ...siblings.values(),
    ...[...shared.values()].filter(({ length }) => length <= COMMON_SHINGLE),
  ];
  const seen = new Set<string>();
  const matches: SimilarityMatch[] = [];
  for (const group of groups) {
    for (const { left, right } of pairs(group, ({ root }) => isTarget(root))) {
      const key = `${left.id}\n${right.id}`;
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      const sibling = left.set === right.set;
      const match = sibling
        ? score(left.root, left.own, right.root, right.own)
        : score(left.root, left.full, right.root, right.full);
      if (match.score >= threshold) {
        matches.push(match);
      }
    }
  }
  return matches;
}

/** One passage shared inside a set, with the questions that share it. */
interface Passage {
  readonly locale: string;
  readonly members: string[];
  readonly print: Print;
  readonly set: string;
}

/** Names one shared passage by its set and the questions that use it. */
function passageName({ members, set }: Passage) {
  return `${set} (${members.join(", ")})`;
}

/** Compares every shared passage with the passages of other sets. */
function passageMatches(
  all: readonly Unit[],
  isTarget: (root: string) => boolean,
  threshold: number
) {
  const passages = new Map<string, Passage>();
  for (const unit of all) {
    const text = unit.stimulus.join(" ");
    if (words(text, false).length < PASSAGE_WORDS) {
      continue;
    }
    const key = `${unit.set}\n${unit.locale}\n${text}`;
    const name = unit.root.slice(unit.set.length + 1);
    const passage = passages.get(key);
    if (passage === undefined) {
      const { locale, set } = unit;
      passages.set(key, { locale, members: [name], print: print(text), set });
      continue;
    }
    passage.members.push(name);
  }
  return pairs([...passages.values()], ({ set }) => isTarget(set))
    .filter(
      ({ left, right }) =>
        left.set !== right.set && left.locale === right.locale
    )
    .map(({ left, right }) =>
      score(passageName(left), left.print, passageName(right), right.print)
    )
    .filter((match) => match.score >= threshold);
}

/** Orders matches from the most similar, then by path. */
function ranked(matches: readonly SimilarityMatch[]) {
  return [...matches].sort(
    (left, right) =>
      right.score - left.score ||
      compareCodeUnits(left.first, right.first) ||
      compareCodeUnits(left.second, right.second)
  );
}

/** Finds questions and passages under a target that read like others in the bank. */
export const scanQuestionSimilarity = Effect.fn(
  "AksaraCorpus.scanQuestionSimilarity"
)(function* (
  corpusRoot: string,
  sources: readonly QuestionSource[],
  target: string,
  threshold: number
) {
  const prompts = yield* readQuestionPrompts(corpusRoot, sources);
  const all = units(prompts).map((unit, id): Unit => ({ ...unit, id }));
  /** Targets the directory itself and everything beneath it. */
  const isTarget = (root: string) =>
    root === target || root.startsWith(`${target}/`);
  return {
    items: ranked(itemMatches(all, isTarget, threshold)),
    passages: ranked(passageMatches(all, isTarget, threshold)),
  } satisfies SimilarityReport;
});
