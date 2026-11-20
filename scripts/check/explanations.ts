import { FIGURE_NAMES } from "@nakafa/aksara-contracts/visual/catalog";
import { decodeTryoutRegistry } from "@nakafa/aksara-corpus/tryout/registry";
import {
  Array as Arr,
  Effect,
  FileSystem,
  HashMap,
  HashSet,
  Option,
  Schema,
} from "effect";

import { trackedFiles } from "#scripts/check/files";
import { partReport } from "#scripts/check/parts";
import { changedFiles } from "#scripts/check/visuals";
import { runEntry } from "#scripts/entry";

/** The ref a change is measured from, as the visuals check measures it. */
const BASE_REF = "origin/main";

/** One worked answer: `tryout/<country>/<exam>/<section>/<set>/<question>/answer.<locale>.mdx`. */
const ANSWER_FILE =
  /^packages\/corpus\/question-bank\/tryout\/(?<section>[^/]+\/[^/]+\/[^/]+)\/[^/]+\/[^/]+\/answer\.[a-z]+\.mdx$/u;

/** The opening tag of a component, whose name the catalog says is a figure or not. */
const COMPONENT_TAG = /<[A-Z][A-Za-z0-9]*/gu;

/** A Markdown table row: text between pipes on one line. */
const TABLE_ROW = /^\s*\|.*\|\s*$/mu;

/** A highlighted quotation, the evidence a reading answer may point at. */
const HIGHLIGHT_TAG = /<Highlight[\s>]/u;

/** Every catalog component of kind figure: labs, 3D scenes, charts, diagrams. */
const FIGURES = HashSet.fromIterable(FIGURE_NAMES);

/** What a section's answers show beside their prose, read from its source. */
const ExplanationKindSchema = Schema.Literals(["figure", "evidence"]);
type ExplanationKind = typeof ExplanationKindSchema.Type;

/** One answer that falls short of its section's kind. */
const ExplanationFindingSchema = Schema.Struct({
  file: Schema.String,
  kind: ExplanationKindSchema,
});
type ExplanationFinding = typeof ExplanationFindingSchema.Type;

/** Changed or new answers that show less than their section asks. */
export class ExplanationVisualError extends Schema.TaggedError<
  ExplanationVisualError,
  { readonly brand: unique symbol }
>()("ExplanationVisualError", {
  findings: Schema.Array(ExplanationFindingSchema),
}) {}

/** An answer that names a section no try-out declares. */
export class ExplanationSectionError extends Schema.TaggedError<
  ExplanationSectionError,
  { readonly brand: unique symbol }
>()("ExplanationSectionError", { file: Schema.String }) {}

/** The `<country>/<exam>/<section>` of one worked answer, or none for any other file. */
export function answerSection(file: string): Option.Option<string> {
  return Option.fromNullishOr(ANSWER_FILE.exec(file)?.groups?.section);
}

/** Tells whether one answer source holds a catalog figure. */
export function holdsFigure(source: string): boolean {
  return Arr.some([...source.matchAll(COMPONENT_TAG)], ([tag]) =>
    HashSet.has(FIGURES, tag.slice(1))
  );
}

/** Tells whether one answer shows what its section's kind asks. */
export function meetsKind(kind: ExplanationKind, source: string): boolean {
  if (holdsFigure(source)) {
    return true;
  }
  return (
    kind === "evidence" &&
    (TABLE_ROW.test(source) || HIGHLIGHT_TAG.test(source))
  );
}

/** Maps every try-out section's `<country>/<exam>/<section>` to its explanation kind. */
export const explanationKinds = Effect.fn("AksaraPolicy.explanationKinds")(
  function* () {
    // A registry that does not decode is a broken corpus, which the corpus
    // tests already fail, so the gate treats it as a defect.
    const sources = yield* decodeTryoutRegistry().pipe(Effect.orDie);
    return HashMap.fromIterable(
      Arr.flatMap(sources, ({ countryKey, examKey, tracks }) =>
        Arr.flatMap(tracks, ({ profile }) =>
          Arr.map(
            profile.sections,
            ({ explanation, key }) =>
              [`${countryKey}/${examKey}/${key}`, explanation] as const
          )
        )
      )
    );
  }
);

/**
 * Holds each changed answer to its section's kind and counts the rest. A
 * changed or new answer that shows too little fails; an untouched one is only
 * counted, so a revision lifts the bank one answer at a time and no change adds
 * a text-only explanation.
 */
export const explanationReport = Effect.fn("AksaraPolicy.explanationReport")(
  function* (
    files: readonly string[],
    changed: readonly string[],
    kinds: HashMap.HashMap<string, ExplanationKind>
  ) {
    const fileSystem = yield* FileSystem.FileSystem;
    const answers = Arr.getSomes(
      Arr.map(files, (file) =>
        Option.map(answerSection(file), (section) => ({ file, section }))
      )
    );
    const short = Arr.getSomes(
      yield* Effect.forEach(
        answers,
        ({ file, section }) =>
          Effect.gen(function* () {
            const kind = HashMap.get(kinds, section);
            if (Option.isNone(kind)) {
              return yield* new ExplanationSectionError({ file });
            }
            const source = yield* fileSystem.readFileString(file);
            return meetsKind(kind.value, source)
              ? Option.none<ExplanationFinding>()
              : Option.some({ file, kind: kind.value });
          }),
        { concurrency: 16 }
      )
    );
    const blocking = Arr.filter(short, ({ file }) =>
      Arr.contains(changed, file)
    );
    yield* Effect.logInfo(
      `Explanations: ${answers.length - short.length} of ${answers.length} answers show what their section asks; ${short.length} untouched answers still to lift.`
    );
    if (blocking.length > 0) {
      for (const { file, kind } of blocking) {
        yield* Effect.logError(
          `${file}: a ${kind} section's answer needs ${kind === "figure" ? "a catalog figure" : "a figure, a table, or a highlighted quotation"}`
        );
      }
      return yield* new ExplanationVisualError({ findings: blocking });
    }
  }
);

/**
 * The gate's check: every answer this change touches, measured from `ref`,
 * meets its kind, and every answer of an item with parts names its parts.
 */
export const checkExplanations = Effect.fn("AksaraPolicy.checkExplanations")(
  function* (ref: string) {
    const files = yield* trackedFiles();
    const changed = yield* changedFiles(ref);
    const kinds = yield* explanationKinds();
    yield* explanationReport(files, changed, kinds);
    return yield* partReport(files, changed);
  }
);

runEntry(import.meta.main, checkExplanations(BASE_REF));
