import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  type LearningProgram,
  LearningProgramKeySchema,
  LearningProgramSchema,
  ProgramTranslationSchema,
} from "@nakafa/aksara-contracts/program/spec";
import { Effect, Schema } from "effect";

import { LocaleOverlayAppLocaleSchema } from "#corpus/locale/source";
import { programLocaleSources } from "#corpus/program/locale-registry";
import type { LearningProgramSource } from "#corpus/program/schema";

/** Permanent locale-owned title and route for one learning program. */
export const ProgramLocaleSourceSchema = Schema.Struct({
  appLocale: LocaleOverlayAppLocaleSchema,
  programKey: LearningProgramKeySchema,
  publicSlug: ProgramTranslationSchema.fields.publicSlug,
  title: ProgramTranslationSchema.fields.title,
});
export type ProgramLocaleSource = typeof ProgramLocaleSourceSchema.Type;
export type ProgramLocaleSourceInput = typeof ProgramLocaleSourceSchema.Encoded;

/** One program locale source failed strict decoding. */
export class ProgramLocaleCatalogError extends Schema.TaggedError<ProgramLocaleCatalogError>()(
  "ProgramLocaleCatalogError",
  { cause: Schema.Unknown }
) {}

/** Program locale copy has no unique matching base source. */
export class ProgramLocaleOwnershipError extends Schema.TaggedError<ProgramLocaleOwnershipError>()(
  "ProgramLocaleOwnershipError",
  {
    appLocale: LocaleOverlayAppLocaleSchema,
    programKey: LearningProgramKeySchema,
  }
) {}

/** Returns the one source-control target that owns a program locale. */
export function programLocaleSourcePath(
  appLocale: ProgramLocaleSource["appLocale"]
) {
  return CorpusSourcePathSchema.make(
    `packages/corpus/program/locale/${appLocale}.ts`
  );
}

/** Strictly decodes permanent locale-owned program copy. */
export const decodeProgramLocaleCatalog = Effect.fn(
  "AksaraCorpus.decodeProgramLocaleCatalog"
)(function* (input: unknown = programLocaleSources) {
  return yield* Schema.decodeUnknownEffect(
    Schema.Array(ProgramLocaleSourceSchema)
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError((cause) => new ProgramLocaleCatalogError({ cause }))
  );
});

/** Composes one reviewed locale translation onto its stable base program. */
export const composeProgramLocale = Effect.fn(
  "AksaraCorpus.composeProgramLocale"
)(function* (program: LearningProgram, locale: ProgramLocaleSource) {
  if (program.key !== locale.programKey) {
    return yield* new ProgramLocaleOwnershipError({
      appLocale: locale.appLocale,
      programKey: locale.programKey,
    });
  }
  return LearningProgramSchema.make({
    ...program,
    translations: [
      ...program.translations,
      {
        appLocale: locale.appLocale,
        publicSlug: locale.publicSlug,
        title: locale.title,
      },
    ],
  });
});

/** Composes exact locale rows and rejects duplicate or orphan ownership. */
export const composeProgramLocaleCatalog = Effect.fn(
  "AksaraCorpus.composeProgramLocaleCatalog"
)(function* (
  programs: readonly LearningProgramSource[],
  locales: readonly ProgramLocaleSource[]
) {
  const composed: LearningProgram[] = [];
  const consumed = new Set<ProgramLocaleSource>();
  const identities = new Set<string>();
  for (const program of programs) {
    const owned = locales.filter(
      ({ programKey }) => programKey === program.key
    );
    let current: LearningProgram = program;
    for (const locale of owned) {
      const identity = `${locale.programKey}\0${locale.appLocale}`;
      if (identities.has(identity)) {
        return yield* new ProgramLocaleOwnershipError({
          appLocale: locale.appLocale,
          programKey: locale.programKey,
        });
      }
      identities.add(identity);
      current = yield* composeProgramLocale(current, locale);
      consumed.add(locale);
    }
    composed.push(current);
  }
  const orphan = locales.find((locale) => !consumed.has(locale));
  if (orphan !== undefined) {
    return yield* new ProgramLocaleOwnershipError({
      appLocale: orphan.appLocale,
      programKey: orphan.programKey,
    });
  }
  return composed;
});
