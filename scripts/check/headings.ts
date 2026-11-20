import { Array as Arr, Effect, HashSet, Option, Order, Schema } from "effect";
import type { CorpusPage } from "#nakafa-content/heading/identity";
import { findIdentityFindings } from "#nakafa-content/heading/identity";
import { findPageFindings } from "#nakafa-content/heading/page";
import { isHeadingOnlyChange } from "#nakafa-content/heading/relabel";
import { findSkeletonFindings } from "#nakafa-content/heading/skeleton";
import { correctsFiguresOnly } from "#nakafa-content/mdx/figure";
import { findRepeatFindings } from "#nakafa-content/prose/repeat";
import { trackedFiles } from "#scripts/check/files";
import { corpusPages, parsePage, sourceAt } from "#scripts/check/pages";
import { changedFiles, mergeBase } from "#scripts/check/visuals";
import { runEntry } from "#scripts/entry";

/** The ref a change is measured from, as the visuals check measures it. */
const BASE_REF = "origin/main";

/** One outline finding of a corpus page. */
const OutlineFindingSchema = Schema.Struct({
  blocking: Schema.Boolean,
  file: Schema.String,
  line: Schema.Finite,
  message: Schema.String,
  rule: Schema.String,
});
type OutlineFinding = typeof OutlineFindingSchema.Type;

/**
 * Pages whose outline, headings, or structure the rules reject: how many
 * findings fail the run. The report has already logged each of them.
 */
export class OutlinePolicyError extends Schema.TaggedError<
  OutlinePolicyError,
  { readonly brand: unique symbol }
>()("OutlinePolicyError", {
  blocking: Schema.Finite,
  review: Schema.Finite,
}) {}

/**
 * What one run checks and how strictly: every page or only the touched ones,
 * the ref the change is measured from, and whether review findings fail too,
 * as they should for a lesson revision before review.
 */
const HeadingOptionsSchema = Schema.Struct({
  all: Schema.Boolean,
  base: Schema.String,
  strictReview: Schema.Boolean,
});
export type HeadingOptions = typeof HeadingOptionsSchema.Type;

/** Reads `--all`, `--strict-review`, and `--base <ref>` from the arguments. */
export function headingOptions(args: readonly string[]): HeadingOptions {
  const base = Option.flatMap(
    Arr.findFirstIndex(args, (argument) => argument === "--base"),
    (at) => Arr.get(args, at + 1)
  );
  return {
    all: Arr.contains(args, "--all"),
    base: Option.getOrElse(base, () => BASE_REF),
    strictReview: Arr.contains(args, "--strict-review"),
  };
}

const byPlace = Order.combine(
  Order.mapInput(Order.String, (finding: OutlineFinding) => finding.file),
  Order.mapInput(Order.Number, (finding: OutlineFinding) => finding.line)
);

/**
 * Every finding of the pages in `report`: the rules that read one page, and
 * the identity, skeleton, and repetition rules that compare it with every page of the
 * corpus in its locale.
 */
export function outlineFindings(
  pages: readonly CorpusPage[],
  report: HashSet.HashSet<string>
): readonly OutlineFinding[] {
  const reported = Arr.filter(pages, (page) => HashSet.has(report, page.file));
  const own = Arr.flatMap(reported, ({ file, page }): OutlineFinding[] =>
    Arr.map(findPageFindings(page), (finding) => ({ ...finding, file }))
  );
  const shared = Arr.map(
    [
      ...findIdentityFindings(pages, report),
      ...findSkeletonFindings(pages, report),
      ...findRepeatFindings(pages, report),
    ],
    ([file, finding]) => ({ ...finding, file })
  );
  return Arr.sort([...own, ...shared], byPlace);
}

/**
 * The review rule for a rename-only change: a reported page whose change
 * edits only its headings, while its base version failed the outline,
 * uniqueness, or skeleton rules. Renaming keeps the repetition in place.
 */
export const relabelFindings = Effect.fn("AksaraOutline.relabelFindings")(
  function* (
    pages: readonly CorpusPage[],
    report: HashSet.HashSet<string>,
    base: string
  ) {
    const reported = Arr.filter(pages, (page) =>
      HashSet.has(report, page.file)
    );
    const found = yield* Effect.forEach(reported, (head) =>
      Effect.gen(function* () {
        const baseSource = yield* sourceAt(base, head.file);
        if (
          Option.isNone(baseSource) ||
          !isHeadingOnlyChange(baseSource.value, head.source)
        ) {
          return Option.none<OutlineFinding>();
        }
        const basePage = yield* parsePage(
          head.file,
          { kind: head.page.kind, locale: head.page.locale },
          baseSource.value
        );
        const before = Arr.map(pages, (page) =>
          page.file === head.file ? basePage : page
        );
        const failed = Arr.some(
          outlineFindings(before, HashSet.make(head.file)),
          ({ blocking }) => blocking
        );
        return failed
          ? Option.some({
              blocking: false,
              file: head.file,
              line: 1,
              message:
                "This change edits only the headings of a page that failed the outline, uniqueness, or skeleton rules at its base. Renaming headings keeps the repeated structure and text: restructure and rewrite the page.",
              rule: "heading-only-change",
            })
          : Option.none<OutlineFinding>();
      })
    );
    return Arr.getSomes(found);
  }
);

/**
 * The touched pages a change revises. A page whose change only corrects its
 * figures (D26) keeps its outline and its text as they were, so it keeps its
 * findings until a revision touches it. A page the change adds is revised.
 */
export const revisedPages = Effect.fn("AksaraOutline.revisedPages")(function* (
  pages: readonly CorpusPage[],
  touched: HashSet.HashSet<string>,
  base: string
) {
  const corrected = yield* Effect.forEach(
    Arr.filter(pages, (page) => HashSet.has(touched, page.file)),
    (head) =>
      Effect.gen(function* () {
        const baseSource = yield* sourceAt(base, head.file);
        if (Option.isNone(baseSource)) {
          return Option.none<string>();
        }
        const basePage = yield* parsePage(
          head.file,
          { kind: head.page.kind, locale: head.page.locale },
          baseSource.value
        );
        return correctsFiguresOnly(
          { source: basePage.source, tree: basePage.page.tree },
          { source: head.source, tree: head.page.tree }
        )
          ? Option.some(head.file)
          : Option.none<string>();
      })
  );
  return HashSet.difference(
    touched,
    HashSet.fromIterable(Arr.getSomes(corrected))
  );
});

/** Logs every finding and fails when one blocks, or any does under strict review. */
export const outlineReport = Effect.fn("AksaraOutline.outlineReport")(
  function* (
    findings: readonly OutlineFinding[],
    options: HeadingOptions,
    counts: { readonly checked: number; readonly pages: number }
  ) {
    for (const { blocking, file, line, message, rule } of findings) {
      yield* blocking
        ? Effect.logError(`${file}:${line} [${rule}] ${message}`)
        : Effect.logWarning(`${file}:${line} [review: ${rule}] ${message}`);
    }
    const blocking = Arr.filter(findings, (finding) => finding.blocking);
    yield* Effect.logInfo(
      `Outline: ${counts.checked} of ${counts.pages} pages checked against every page of their locale; ${blocking.length} blocking and ${findings.length - blocking.length} review findings.`
    );
    const review = findings.length - blocking.length;
    if (blocking.length > 0 || (options.strictReview && review > 0)) {
      return yield* new OutlinePolicyError({
        blocking: blocking.length,
        review: options.strictReview ? review : 0,
      });
    }
  }
);

/**
 * The gate's check: holds every lesson and article page this change revised,
 * measured from the base ref, to the outline and heading rules, compared with
 * the whole corpus. An untouched page, or one whose figures alone were
 * corrected, keeps its findings until a revision touches it, so the corpus
 * rises to the rules one revision at a time.
 */
export const checkHeadings = Effect.fn("AksaraOutline.checkHeadings")(
  function* (options: HeadingOptions) {
    const pages = yield* corpusPages(yield* trackedFiles());
    const files = Arr.map(pages, ({ file }) => file);
    const base = yield* mergeBase(options.base);
    const report = options.all
      ? HashSet.fromIterable(files)
      : yield* revisedPages(
          pages,
          HashSet.intersection(
            HashSet.fromIterable(files),
            HashSet.fromIterable(yield* changedFiles(options.base))
          ),
          base
        );
    const findings = Arr.sort(
      [
        ...outlineFindings(pages, report),
        ...(yield* relabelFindings(pages, report, base)),
      ],
      byPlace
    );
    return yield* outlineReport(findings, options, {
      checked: HashSet.size(report),
      pages: pages.length,
    });
  }
);

runEntry(
  import.meta.main,
  checkHeadings(headingOptions(Arr.drop(process.argv, 2)))
);
