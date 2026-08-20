import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { Effect, Schema } from "effect";

import {
  curriculumLocaleRequiredKeys,
  decodeCurriculumLocaleCatalog,
  validateCurriculumLocaleRows,
} from "#corpus/curriculum/locale-source";
import { projectCurriculumRoutes } from "#corpus/curriculum/route";
import type { CurriculumSource } from "#corpus/curriculum/schema";
import { decodeCurriculumCatalog } from "#corpus/curriculum/source";
import { CANDIDATE_APP_LOCALES } from "#corpus/locale/lifecycle";
import {
  appLocaleCode,
  LocaleOverlayAppLocaleCodeSchema,
  LocaleOverlayAppLocaleSchema,
} from "#corpus/locale/source";
import {
  decodeMaterialDomains,
  type MaterialDomainDescriptor,
} from "#corpus/material/domain";
import {
  decodeMaterialLocaleCatalog,
  type MaterialLocaleCatalog,
} from "#corpus/material/locale";
import {
  composeCompleteMaterialLocaleCatalog,
  validateMaterialLocaleCatalog,
} from "#corpus/material/locale-catalog";
import type { LessonMaterialSource } from "#corpus/material/schema";
import { decodeMaterialSources } from "#corpus/material/source";
import { decodeAuthoringProgramCatalog } from "#corpus/program/catalog";
import { decodeProgramLocaleCatalog } from "#corpus/program/locale";

const CountSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThanOrEqualTo(0))
);

/** Evidence for every present inactive Program and curriculum locale source. */
export const CandidateProgramValidationSchema = Schema.Struct({
  curriculumLocaleCount: CountSchema,
  curriculumRouteCount: CountSchema,
  programLocaleCount: CountSchema,
  readyLocaleCount: CountSchema,
});
export type CandidateProgramValidation =
  typeof CandidateProgramValidationSchema.Type;

/** Candidate curriculum copy is detached from its localized program root. */
export class CandidateProgramOwnershipError extends Schema.TaggedError<CandidateProgramOwnershipError>()(
  "CandidateProgramOwnershipError",
  {
    appLocale: AppLocaleSchema,
    owner: Schema.Trimmed.check(Schema.isNonEmpty()),
    reason: Schema.Literal("curriculum-program"),
  }
) {}

interface CandidateProgramInput {
  readonly appLocales?: readonly AppLocale[];
  readonly curricula?: readonly CurriculumSource[];
  readonly curriculumLocaleInput?: unknown;
  readonly domains?: readonly MaterialDomainDescriptor[];
  readonly materialInput?: unknown;
  readonly materialLocaleInput?: unknown;
  readonly programInput?: unknown;
  readonly programLocaleInput?: unknown;
}

/** Returns whether one locale has the exact source inventory needed for routes. */
function hasCompleteLocale(input: {
  readonly appLocale: AppLocale;
  readonly curriculumLocaleCount: number;
  readonly materialCatalog: MaterialLocaleCatalog;
  readonly materialCount: number;
  readonly programLocaleCount: number;
  readonly programCount: number;
  readonly requiredCurriculumLocaleCount: number;
  readonly requiredDomainCount: number;
}) {
  const domainCount = input.materialCatalog.domains.filter(
    ({ appLocale }) => appLocale === input.appLocale
  ).length;
  const materialCount = input.materialCatalog.sources.filter(
    ({ appLocale }) => appLocale === input.appLocale
  ).length;
  return (
    input.programLocaleCount === input.programCount &&
    input.curriculumLocaleCount === input.requiredCurriculumLocaleCount &&
    domainCount === input.requiredDomainCount &&
    materialCount === input.materialCount
  );
}

/** Projects one complete candidate locale through the activation route owner. */
const projectCandidateLocale = Effect.fn(
  "AksaraCorpus.projectCandidateProgramLocale"
)(function* (input: {
  readonly appLocale: AppLocale;
  readonly curricula: readonly CurriculumSource[];
  readonly curriculumRows: readonly unknown[];
  readonly domains: readonly MaterialDomainDescriptor[];
  readonly materialCatalog: MaterialLocaleCatalog;
  readonly materials: readonly LessonMaterialSource[];
  readonly programs: Effect.Success<
    ReturnType<typeof decodeAuthoringProgramCatalog>
  >;
}) {
  const overlayAppLocale = yield* Schema.decodeUnknownEffect(
    LocaleOverlayAppLocaleCodeSchema
  )(appLocaleCode(input.appLocale));
  const localized = yield* composeCompleteMaterialLocaleCatalog({
    appLocale: overlayAppLocale,
    catalog: input.materialCatalog,
    descriptors: input.domains,
    sources: input.materials,
  });
  return yield* projectCurriculumRoutes({
    appLocales: [input.appLocale],
    curricula: input.curricula,
    curriculumLocaleInput: input.curriculumRows,
    domains: localized.domains,
    materials: localized.sources,
    programs: input.programs,
  });
});

/** Validates present Program copy and projects only complete candidate locales. */
export const validateCandidateProgram = Effect.fn(
  "AksaraCorpus.validateCandidateProgram"
)(function* (input: CandidateProgramInput = {}) {
  const appLocales = (input.appLocales ?? CANDIDATE_APP_LOCALES).filter(
    Schema.is(LocaleOverlayAppLocaleSchema)
  );
  if (appLocales.length === 0) {
    return CandidateProgramValidationSchema.make({
      curriculumLocaleCount: 0,
      curriculumRouteCount: 0,
      programLocaleCount: 0,
      readyLocaleCount: 0,
    });
  }
  const [curricula, domains, materials, programRows, curriculumRows] =
    yield* Effect.all([
      input.curricula === undefined
        ? decodeCurriculumCatalog()
        : Effect.succeed(input.curricula),
      input.domains === undefined
        ? decodeMaterialDomains()
        : Effect.succeed(input.domains),
      decodeMaterialSources(input.materialInput),
      decodeProgramLocaleCatalog(input.programLocaleInput),
      decodeCurriculumLocaleCatalog(input.curriculumLocaleInput),
    ]);
  const programs = yield* decodeAuthoringProgramCatalog(
    input.programInput,
    programRows
  );
  yield* validateCurriculumLocaleRows(curricula, curriculumRows);
  const materialCatalog = yield* decodeMaterialLocaleCatalog(
    domains,
    input.materialLocaleInput
  );
  yield* validateMaterialLocaleCatalog({
    catalog: materialCatalog,
    descriptors: domains,
    sources: materials,
  });

  let curriculumRouteCount = 0;
  let readyLocaleCount = 0;
  for (const appLocale of appLocales) {
    const selectedPrograms = programRows.filter(
      (row) => row.appLocale === appLocale
    );
    const selectedCurricula = curriculumRows.filter(
      (row) => row.appLocale === appLocale
    );
    for (const row of selectedCurricula) {
      if (
        !selectedPrograms.some(
          (program) => program.programKey === row.programKey
        )
      ) {
        return yield* new CandidateProgramOwnershipError({
          appLocale,
          owner: row.programKey,
          reason: "curriculum-program",
        });
      }
    }
    if (
      !hasCompleteLocale({
        appLocale,
        curriculumLocaleCount: selectedCurricula.length,
        materialCatalog,
        materialCount: materials.length,
        programCount: programs.length,
        programLocaleCount: selectedPrograms.length,
        requiredCurriculumLocaleCount:
          curriculumLocaleRequiredKeys(curricula).length,
        requiredDomainCount: domains.length,
      })
    ) {
      continue;
    }
    const routes = yield* projectCandidateLocale({
      appLocale,
      curricula,
      curriculumRows: selectedCurricula,
      domains,
      materialCatalog,
      materials,
      programs,
    });
    curriculumRouteCount += routes.length;
    readyLocaleCount += 1;
  }
  return CandidateProgramValidationSchema.make({
    curriculumLocaleCount: curriculumRows.filter((row) =>
      appLocales.includes(AppLocaleSchema.make(row.appLocale))
    ).length,
    curriculumRouteCount,
    programLocaleCount: programRows.filter((row) =>
      appLocales.includes(AppLocaleSchema.make(row.appLocale))
    ).length,
    readyLocaleCount,
  });
});
