import type { QuestionResponseSource } from "@nakafa/aksara-contracts/question/item";
import { compareCodeUnits } from "@nakafa/aksara-contracts/text/order";
import {
  Array as Arr,
  Effect,
  MutableHashMap,
  MutableHashSet,
  Option,
  Predicate,
  Schema,
  Struct,
} from "effect";
import {
  type QuestionPrompt,
  readQuestionPrompts,
} from "#corpus/question-bank/prompt";
import {
  type Print,
  PrintSchema,
  score,
  shingles,
} from "#corpus/question-bank/similarity/print";
import type { QuestionSource } from "#corpus/question-bank/source";

const METADATA_PATTERN = /^export const metadata = \{[\s\S]*?\};\s*/u;
const MATH_ATTRIBUTE_PATTERN = /math="([^"]*)"/gu;
const TAG_PATTERN = /<[^>]+>/gu;
const PARAGRAPH_PATTERN = /\n\s*\n/u;
const COMMAND_PATTERN = /\\([a-z]+)/gu;
const SYMBOL_PATTERN = /[{}()[\]$^_=+\-*/,.;:!?"'`|<>“”„‘’]/gu;
const NUMBER_PATTERN = /\d+/gu;
const SPACE_PATTERN = /\s+/u;
const PASSAGE_WORDS = 25;
const COMMON_SHINGLE = 64;

/** Splits one text into comparable words, optionally masking every number. */
function words(text: string, mask: boolean) {
  const spaced = text
    .toLowerCase()
    .replace(COMMAND_PATTERN, " \\$1 ")
    .replace(SYMBOL_PATTERN, " ");
  const masked = mask ? spaced.replace(NUMBER_PATTERN, "#") : spaced;
  return masked.split(SPACE_PATTERN).filter((word) => word.length > 0);
}

/** Prints one text in both comparison forms. */
function print(text: string): Print {
  return {
    exact: shingles(words(text, false)),
    masked: shingles(words(text, true)),
  };
}

/** One pair of questions or passages that read too much alike. */
const SimilarityMatchSchema = Schema.Struct({
  exact: Schema.Finite,
  first: Schema.String,
  masked: Schema.Finite,
  score: Schema.Finite,
  second: Schema.String,
});
export type SimilarityMatch = typeof SimilarityMatchSchema.Type;

/** Every item and passage pair at or above the threshold, highest first. */
const SimilarityReportSchema = Schema.Struct({
  items: Schema.Array(SimilarityMatchSchema),
  passages: Schema.Array(SimilarityMatchSchema),
});
export type SimilarityReport = typeof SimilarityReportSchema.Type;

/** One prompt with its own wording separated from the passage it shares. */
const UnitSchema = Schema.Struct({
  full: PrintSchema,
  id: Schema.Finite,
  locale: Schema.String,
  own: PrintSchema,
  root: Schema.String,
  set: Schema.String,
  stimulus: Schema.Array(Schema.String),
});
type Unit = typeof UnitSchema.Type;

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
  const groups = MutableHashMap.empty<string, QuestionPrompt[]>();
  for (const prompt of prompts) {
    const key = `${setOf(prompt.source.sourceRoot)}\n${prompt.locale}`;
    MutableHashMap.set(groups, key, [
      ...Option.getOrElse(MutableHashMap.get(groups, key), () => []),
      prompt,
    ]);
  }
  return [...MutableHashMap.values(groups)].flatMap((members) => {
    const read = members.map((prompt) => ({
      list: paragraphs(prompt.rawMdx),
      prompt,
    }));
    const counts = MutableHashMap.empty<string, number>();
    for (const part of read.flatMap(({ list }) => Arr.dedupe(list))) {
      MutableHashMap.set(
        counts,
        part,
        Option.getOrElse(MutableHashMap.get(counts, part), () => 0) + 1
      );
    }
    /** A paragraph is shared unless exactly one prompt in the set uses it. */
    const isShared = (part: string) =>
      Option.getOrUndefined(MutableHashMap.get(counts, part)) !== 1;
    return read.map(({ list, prompt }): Omit<Unit, "id"> => {
      const answers = Struct.keys(prompt.source.item.responses)
        .map((key) => prompt.source.item.responses[key])
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
function collect(
  map: MutableHashMap.MutableHashMap<string, Unit[]>,
  key: string,
  unit: Unit
) {
  const list = Option.getOrUndefined(MutableHashMap.get(map, key));
  if (list === undefined) {
    MutableHashMap.set(map, key, [unit]);
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
  const siblings = MutableHashMap.empty<string, Unit[]>();
  const shared = MutableHashMap.empty<string, Unit[]>();
  for (const unit of all) {
    collect(siblings, `${unit.set}\n${unit.locale}`, unit);
    for (const shingle of unit.full.masked) {
      collect(shared, `${unit.locale}\n${shingle}`, unit);
    }
  }
  const groups = [
    ...MutableHashMap.values(siblings),
    ...[...MutableHashMap.values(shared)].filter(
      ({ length }) => length <= COMMON_SHINGLE
    ),
  ];
  const seen = MutableHashSet.empty<string>();
  const matches: SimilarityMatch[] = [];
  for (const group of groups) {
    for (const { left, right } of pairs(group, ({ root }) => isTarget(root))) {
      const key = `${left.id}\n${right.id}`;
      if (MutableHashSet.has(seen, key)) {
        continue;
      }
      MutableHashSet.add(seen, key);
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
const PassageSchema = Schema.Struct({
  locale: Schema.String,
  members: Schema.mutable(Schema.Array(Schema.String)),
  print: PrintSchema,
  set: Schema.String,
});
type Passage = typeof PassageSchema.Type;

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
  const passages = MutableHashMap.empty<string, Passage>();
  for (const unit of all) {
    const text = unit.stimulus.join(" ");
    if (words(text, false).length < PASSAGE_WORDS) {
      continue;
    }
    const key = `${unit.set}\n${unit.locale}\n${text}`;
    const name = unit.root.slice(unit.set.length + 1);
    const passage = Option.getOrUndefined(MutableHashMap.get(passages, key));
    if (passage === undefined) {
      const { locale, set } = unit;
      MutableHashMap.set(passages, key, {
        locale,
        members: [name],
        print: print(text),
        set,
      });
      continue;
    }
    passage.members.push(name);
  }
  return pairs([...MutableHashMap.values(passages)], ({ set }) => isTarget(set))
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
