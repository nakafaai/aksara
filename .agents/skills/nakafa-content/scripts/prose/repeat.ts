import {
  Array as Arr,
  HashSet,
  MutableHashMap,
  MutableList,
  Option,
  Order,
} from "effect";
import { constant } from "effect/Function";
import type { HeadingFinding } from "#nakafa-content/heading/finding";
import type { CorpusPage } from "#nakafa-content/heading/identity";
import type { MdxNode } from "#nakafa-content/mdx/parse";

/**
 * The fewest words, formulas aside, that a sentence holds before another
 * lesson repeating it fails. Shorter sentences, such as `Jadi, x = 4.`, recur
 * by nature. Calibrated on the 421 section pages per locale of 20 November
 * 2026: 87 to 130 pages per locale repeat a sentence of six or more words.
 */
export const FEWEST_SENTENCE_WORDS = 6;

/** The fewest words a paragraph holds before its wording is compared. */
export const FEWEST_PARAGRAPH_WORDS = 20;

/**
 * The share of five-word runs two paragraphs have in common from which they
 * are one paragraph reworded: 15 to 24 pages per locale reach it today.
 */
export const SHARED_WORDING = 0.5;

const SHINGLE_SIZE = 5;

/**
 * A five-word run that more paragraphs share than this is a phrase of the
 * language, not a copy, so it never makes two paragraphs alike.
 */
const COMMON_SHINGLE = 50;

/** The token that stands for one formula, which is never a word. */
const FORMULA = "⁣";

const TOKEN = /[\p{L}\p{N}]+(?:['’]\p{L}+)*|⁣/gu;
const SENTENCE_END = /(?<=[.!?])\s+/u;
const EXCERPT_LENGTH = 80;
const NAMED_PLACES = 3;

/** One paragraph of a page, in page order. */
export interface ProseBlock {
  readonly line: number;
  readonly text: string;
}

/** Reads the visible prose of one node, each formula as one placeholder. */
function proseText(node: MdxNode): string {
  if (node.type === "text" || node.type === "inlineCode") {
    return String(node.value);
  }
  if (node.type === "mdxJsxTextElement" && node.name === "InlineMath") {
    return ` ${FORMULA} `;
  }
  return Arr.join(Arr.map(node.children ?? [], proseText), "");
}

/**
 * Lists every paragraph of one page with its line, including the paragraphs
 * of list items, quotations, and layout components. Headings, tables, code,
 * and component props are not prose a learner reads as an explanation.
 */
export function proseBlocks(node: MdxNode): readonly ProseBlock[] {
  if (node.type === "paragraph") {
    return [{ line: node.position?.start?.line ?? 1, text: proseText(node) }];
  }
  if (node.type === "heading" || node.type === "table") {
    return [];
  }
  return Arr.flatMap(node.children ?? [], proseBlocks);
}

/** The lower-case words and formula placeholders of one text. */
function tokens(text: string): readonly string[] {
  return Arr.map(Arr.fromIterable(text.toLowerCase().matchAll(TOKEN)), String);
}

/** Counts the words of a token list, formulas aside. */
function wordCount(list: readonly string[]): number {
  return Arr.filter(list, (token) => token !== FORMULA).length;
}

/** One block of a page, with what the repetition rules compare. */
interface Indexed {
  readonly file: string;
  readonly id: number;
  readonly line: number;
  readonly sentences: readonly {
    readonly key: string;
    readonly text: string;
  }[];
  readonly shingles: HashSet.HashSet<string>;
}

/** Reads the long sentences and the five-word runs of one block. */
function indexBlock(file: string, id: number, block: ProseBlock): Indexed {
  const sentences = Arr.getSomes(
    Arr.map(block.text.trim().split(SENTENCE_END), (text) => {
      const list = tokens(text);
      return wordCount(list) >= FEWEST_SENTENCE_WORDS
        ? Option.some({ key: Arr.join(list, " "), text: text.trim() })
        : Option.none();
    })
  );
  const list = tokens(block.text);
  const shingles =
    wordCount(list) >= FEWEST_PARAGRAPH_WORDS
      ? HashSet.fromIterable(
          Arr.map(Arr.window(list, SHINGLE_SIZE), (run) => Arr.join(run, " "))
        )
      : HashSet.empty<string>();
  return { file, id, line: block.line, sentences, shingles };
}

/** The values kept under each key of one index. */
type Index<Value> = MutableHashMap.MutableHashMap<
  string,
  MutableList.MutableList<Value>
>;

/** Adds one value to the list kept under one key. */
function collect<Value>(index: Index<Value>, key: string, value: Value) {
  const list = Option.getOrElse(MutableHashMap.get(index, key), () => {
    const created = MutableList.make<Value>();
    MutableHashMap.set(index, key, created);
    return created;
  });
  MutableList.append(list, value);
}

/** The values kept under one key, none when the key is unknown. */
function holders<Value>(index: Index<Value>, key: string): readonly Value[] {
  return Option.getOrElse(
    Option.map(MutableHashMap.get(index, key), MutableList.toArray),
    constant(Arr.empty<Value>())
  );
}

/** Names the first few other files, then counts the rest. */
function describe(files: readonly string[]): string {
  const sorted = Arr.sort(Arr.dedupe(files), Order.String);
  const rest = sorted.length - NAMED_PLACES;
  const named = Arr.join(sorted.slice(0, NAMED_PLACES), ", ");
  return rest > 0 ? `${named}, and ${rest} more` : named;
}

/** The closest paragraph of another file at or above the shared wording. */
function closestParagraph(
  block: Indexed,
  runs: Index<Indexed>
): Option.Option<readonly [Indexed, number]> {
  const shared = MutableHashMap.empty<number, readonly [Indexed, number]>();
  for (const run of block.shingles) {
    const others = holders(runs, run);
    if (others.length <= COMMON_SHINGLE) {
      for (const other of others) {
        const count = Option.match(MutableHashMap.get(shared, other.id), {
          onNone: () => 0,
          onSome: ([, known]) => known,
        });
        MutableHashMap.set(shared, other.id, [other, count + 1]);
      }
    }
  }
  const scored = Arr.getSomes(
    Arr.map(
      Arr.fromIterable(MutableHashMap.values(shared)),
      ([other, count]) => {
        if (other.file === block.file) {
          return Option.none();
        }
        const union =
          HashSet.size(block.shingles) + HashSet.size(other.shingles) - count;
        const share = count / union;
        return share >= SHARED_WORDING
          ? Option.some([other, share] as const)
          : Option.none();
      }
    )
  );
  return Arr.head(
    Arr.sort(
      scored,
      Order.flip(
        Order.mapInput(
          Order.Number,
          ([, share]: readonly [Indexed, number]) => share
        )
      )
    )
  );
}

/** The findings of one reported block: a repeated sentence, else a near copy. */
function blockFindings(
  block: Indexed,
  sentences: Index<string>,
  runs: Index<Indexed>
): HeadingFinding[] {
  const repeated = Arr.findFirst(block.sentences, ({ key, text }) => {
    const others = Arr.filter(
      holders(sentences, key),
      (file) => file !== block.file
    );
    return others.length > 0 ? Option.some({ others, text }) : Option.none();
  });
  if (Option.isSome(repeated)) {
    const { others, text } = repeated.value;
    return [
      {
        blocking: true,
        line: block.line,
        message: `"${text.slice(0, EXCERPT_LENGTH)}" also stands in ${describe(others)}. Every lesson explains in its own words: write this sentence for this topic instead of reusing it.`,
        rule: "repeated-sentence",
      },
    ];
  }
  return Option.match(closestParagraph(block, runs), {
    onNone: () => [],
    onSome: ([other, share]) => [
      {
        blocking: true,
        line: block.line,
        message: `This paragraph shares ${Math.round(share * 100)}% of its wording with ${other.file}:${other.line}. Write this page's own explanation, opening, transition, or example instead of rewording another lesson's.`,
        rule: "repeated-paragraph",
      },
    ],
  });
}

/**
 * The cross-lesson near-duplicate check of rule 10: a reported lesson page
 * that repeats a sentence of six or more words from another lesson page of
 * its locale, or holds a paragraph that shares half of its five-word runs
 * with one, reuses an explanation instead of writing its own.
 */
export function findRepeatFindings(
  pages: readonly CorpusPage[],
  report: HashSet.HashSet<string>
): readonly (readonly [string, HeadingFinding])[] {
  const locales = Arr.groupBy(
    Arr.filter(pages, ({ page }) => page.kind === "lesson"),
    ({ page }) => page.locale
  );
  return Arr.flatMap(Object.values(locales), (group) => {
    const placed = Arr.flatMap(group, ({ file, page }) =>
      Arr.map(proseBlocks(page.tree), (block) => ({ block, file }))
    );
    const blocks: readonly Indexed[] = Arr.map(placed, ({ block, file }, id) =>
      indexBlock(file, id, block)
    );
    const sentences: Index<string> = MutableHashMap.empty();
    const runs: Index<Indexed> = MutableHashMap.empty();
    for (const block of blocks) {
      for (const { key } of block.sentences) {
        collect(sentences, key, block.file);
      }
      for (const run of block.shingles) {
        collect(runs, run, block);
      }
    }
    const reported = Arr.filter(blocks, (block) =>
      HashSet.has(report, block.file)
    );
    return Arr.flatMap(
      reported,
      (block): (readonly [string, HeadingFinding])[] =>
        Arr.map(
          blockFindings(block, sentences, runs),
          (finding) => [block.file, finding] as const
        )
    );
  });
}
