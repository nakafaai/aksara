import { compileContent } from "@nakafa/aksara-compiler/compile";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { makeQuranProvenanceManifest } from "@nakafa/aksara-contracts/quran/provenance";
import { QuranProvenanceStatusSchema } from "@nakafa/aksara-contracts/quran/snapshot/spec";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { decodeGermanGlossary } from "@nakafa/aksara-corpus/locale/german/glossary";
import { AUTHORING_APP_LOCALES } from "@nakafa/aksara-corpus/locale/source";
import { validateCandidatePreviewInventory } from "@nakafa/aksara-corpus/preview/inventory";
import type { PreviewSource } from "@nakafa/aksara-corpus/preview/source";
import { validateCandidateProgram } from "@nakafa/aksara-corpus/program/candidate";
import { streamQuranRows } from "@nakafa/aksara-corpus/quran/projection";
import { quranProvenanceRecordsFor } from "@nakafa/aksara-corpus/quran/provenance";
import { loadVerifiedQuranSource } from "@nakafa/aksara-corpus/quran/source/integrity";
import { projectCandidateTryoutCatalog } from "@nakafa/aksara-corpus/tryout/catalog";
import { decodeTryoutLocaleRegistry } from "@nakafa/aksara-corpus/tryout/locale-registry";
import { Effect, Schema, Stream } from "effect";
import {
  loadPreviewSources,
  projectPreviewSource,
} from "#publisher/preview/source";

const CountSchema = Schema.Int.pipe(Schema.nonNegative());

/** Compilation evidence for every present but inactive German body. */
export const CandidateContentValidationSchema = Schema.Struct({
  articleCount: CountSchema,
  compiledBodyCount: CountSchema,
  glossaryCount: CountSchema,
  materialCount: CountSchema,
  programCurriculumLocaleCount: CountSchema,
  programCurriculumRouteCount: CountSchema,
  programLocaleCount: CountSchema,
  programReadyLocaleCount: CountSchema,
  questionCount: CountSchema,
  quranProvenanceDigest: Sha256HashSchema,
  quranProvenanceStatus: QuranProvenanceStatusSchema,
  quranRowCount: CountSchema,
  totalCount: CountSchema,
  tryoutCatalogCount: CountSchema,
});
export type CandidateContentValidation =
  typeof CandidateContentValidationSchema.Type;

interface CandidateContentInput {
  readonly checkoutRoot: string;
  readonly rendererManifest: RendererManifestEnvelope;
}

/** Candidate Quran provenance must be approved before locale activation. */
export class CandidateQuranProvenanceError extends Schema.TaggedError<CandidateQuranProvenanceError>()(
  "CandidateQuranProvenanceError",
  { status: QuranProvenanceStatusSchema }
) {}

/** One named candidate-readiness stage failed without erasing its domain cause. */
export class CandidateContentValidationError extends Schema.TaggedError<CandidateContentValidationError>()(
  "CandidateContentValidationError",
  {
    cause: Schema.Unknown,
    stage: Schema.Literal(
      "compile",
      "glossary",
      "inventory",
      "program",
      "quran",
      "tryout"
    ),
  }
) {}

/** Preserves one domain cause behind the central candidate-validation boundary. */
function candidateValidationError(
  stage: CandidateContentValidationError["stage"],
  cause: unknown
) {
  return new CandidateContentValidationError({ cause, stage });
}

/** Authenticates candidate Quran bytes, rows, and the complete provenance gate. */
const validateCandidateQuran = Effect.fn(
  "AksaraPublisher.validateCandidateQuran"
)(function* (checkoutRoot: string) {
  const verified = yield* loadVerifiedQuranSource(
    checkoutRoot,
    AUTHORING_APP_LOCALES
  );
  const provenanceRecords = yield* quranProvenanceRecordsFor(
    AUTHORING_APP_LOCALES
  );
  const [rowCount, provenance] = yield* Effect.all(
    [
      streamQuranRows(verified.source, AUTHORING_APP_LOCALES).pipe(
        Stream.runCount
      ),
      makeQuranProvenanceManifest({
        activeAppLocales: AUTHORING_APP_LOCALES,
        records: provenanceRecords,
      }),
    ],
    { concurrency: 2 }
  );
  if (provenance.status !== "approved") {
    return yield* new CandidateQuranProvenanceError({
      status: provenance.status,
    });
  }
  return { provenance, rowCount };
});

/** Compiles and projects one unique candidate body with the real renderer. */
const validateCandidateSource = Effect.fn(
  "AksaraPublisher.validateCandidateSource"
)(function* (
  checkoutRoot: string,
  rendererManifest: RendererManifestEnvelope,
  source: PreviewSource
) {
  const [loaded] = yield* loadPreviewSources(checkoutRoot, [source]);
  const compiled = yield* compileContent({
    ...loaded.body,
    rendererManifest,
  });
  yield* projectPreviewSource(loaded, compiled.metadata);
});

/** Validates all checked-in German MDX while keeping signed output inactive. */
export const validateCandidateContent = Effect.fn(
  "AksaraPublisher.validateCandidateContent"
)(function* (input: CandidateContentInput) {
  const inventory = yield* validateCandidatePreviewInventory(
    input.checkoutRoot
  ).pipe(
    Effect.mapError((cause) => candidateValidationError("inventory", cause))
  );
  const sources = new Map(
    inventory.sources.map(
      (source) => [source.entry.sourcePath, source] as const
    )
  );
  yield* Effect.forEach(
    sources.values(),
    (source) =>
      validateCandidateSource(
        input.checkoutRoot,
        input.rendererManifest,
        source
      ).pipe(
        Effect.mapError((cause) => candidateValidationError("compile", cause))
      ),
    { concurrency: 8, discard: true }
  );
  const [glossary, quran, tryout, program] = yield* Effect.all(
    [
      decodeGermanGlossary().pipe(
        Effect.mapError((cause) => candidateValidationError("glossary", cause))
      ),
      validateCandidateQuran(input.checkoutRoot).pipe(
        Effect.mapError((cause) => candidateValidationError("quran", cause))
      ),
      decodeTryoutLocaleRegistry().pipe(
        Effect.flatMap(projectCandidateTryoutCatalog),
        Effect.mapError((cause) => candidateValidationError("tryout", cause))
      ),
      validateCandidateProgram().pipe(
        Effect.mapError((cause) => candidateValidationError("program", cause))
      ),
    ],
    { concurrency: 4 }
  );
  return CandidateContentValidationSchema.make({
    articleCount: inventory.articleCount,
    compiledBodyCount: sources.size,
    glossaryCount: glossary.length,
    materialCount: inventory.materialCount,
    programCurriculumLocaleCount: program.curriculumLocaleCount,
    programCurriculumRouteCount: program.curriculumRouteCount,
    programLocaleCount: program.programLocaleCount,
    programReadyLocaleCount: program.readyLocaleCount,
    questionCount: inventory.questionCount,
    quranProvenanceDigest: quran.provenance.digest,
    quranProvenanceStatus: quran.provenance.status,
    quranRowCount: quran.rowCount,
    totalCount: inventory.totalCount,
    tryoutCatalogCount: tryout.length,
  });
});
