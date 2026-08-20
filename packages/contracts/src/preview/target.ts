import { Schema, Struct } from "effect";
import { PublicPathSchema } from "#contracts/ids";
import { AppLocaleSchema } from "#contracts/locale";
import {
  type TryoutExam,
  TryoutExamSchema,
  type TryoutSection,
  TryoutSectionSchema,
  type TryoutSet,
  TryoutSetSchema,
  type TryoutTrack,
  TryoutTrackSchema,
} from "#contracts/tryout/catalog";
import { TryoutPlacementSourceSchema } from "#contracts/tryout/placement";

/** Locale and existing public route refreshed by one preview update. */
export const PreviewRouteSchema = Schema.Struct({
  appLocale: AppLocaleSchema,
  publicPath: PublicPathSchema,
});

/**
 * Placement identity needed to select one preview body.
 * Choices remain owned by the canonical question registry and projections.
 */
export const TryoutPreviewPlacementSchema = TryoutPlacementSourceSchema.pipe(
  (schema) => schema.mapFields(Struct.omit(["choices"]))
);
type TryoutPreviewPlacement = typeof TryoutPreviewPlacementSchema.Type;

interface TryoutPreviewTargetInput {
  readonly exam: TryoutExam;
  readonly placement: TryoutPreviewPlacement;
  readonly section: TryoutSection;
  readonly set: TryoutSet;
  readonly track: TryoutTrack;
}

/** Checks that every target row belongs to one locale-specific hierarchy. */
function hasCoherentTryoutHierarchy(input: TryoutPreviewTargetInput) {
  const rows = [input.track, input.set, input.section, input.placement];
  return (
    rows.every(({ countryKey }) => countryKey === input.exam.countryKey) &&
    rows.every(({ examKey }) => examKey === input.exam.examKey) &&
    rows.every(({ appLocale }) => appLocale === input.exam.appLocale) &&
    rows.every(
      ({ sourceRevision }) => sourceRevision === input.exam.sourceRevision
    ) &&
    input.set.trackKey === input.track.trackKey &&
    input.section.trackKey === input.track.trackKey &&
    input.placement.trackKey === input.track.trackKey &&
    input.section.setKey === input.set.setKey &&
    input.placement.setKey === input.set.setKey &&
    input.placement.sectionKey === input.section.sectionKey
  );
}

/** Checks nested routes and the internal-entry route fallback contract. */
function hasCoherentTryoutRoutes(input: TryoutPreviewTargetInput) {
  if (!input.track.publicPath.startsWith(`${input.exam.publicPath}/`)) {
    return false;
  }
  if (!input.set.publicPath.startsWith(`${input.track.publicPath}/`)) {
    return false;
  }
  if (input.section.visibility === "internal-entry") {
    return input.set.internalEntrySectionKey === input.section.sectionKey;
  }
  return (
    input.set.internalEntrySectionKey === undefined &&
    input.section.publicPath?.startsWith(`${input.set.publicPath}/`) === true
  );
}

/** Checks that the selected placement is owned by the target section source. */
function hasCoherentTryoutPlacement(input: TryoutPreviewTargetInput) {
  return (
    input.placement.questionOrder <= input.section.questionCount &&
    input.placement.questionSourcePath ===
      `${input.section.questionSourcePath}/question-${input.placement.questionOrder}`
  );
}

/** Exact current try-out rows needed to preview one authored question body. */
export const TryoutPreviewTargetSchema = Schema.Struct({
  exam: TryoutExamSchema,
  placement: TryoutPreviewPlacementSchema,
  section: TryoutSectionSchema,
  set: TryoutSetSchema,
  track: TryoutTrackSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(hasCoherentTryoutHierarchy, {
      message:
        "Expected preview target hierarchy keys, locale, and revision to agree.",
    })
  ),
  Schema.check(
    Schema.makeFilter(hasCoherentTryoutRoutes, {
      message:
        "Expected preview target routes to form one reachable hierarchy.",
    })
  ),
  Schema.check(
    Schema.makeFilter(hasCoherentTryoutPlacement, {
      message:
        "Expected preview placement to belong to the selected section source.",
    })
  )
);
export type TryoutPreviewTarget = typeof TryoutPreviewTargetSchema.Type;

/** Derives the existing try-out page used by the trusted authoring preview. */
export function previewTryoutRoute(target: TryoutPreviewTarget) {
  return PreviewRouteSchema.make({
    appLocale: target.section.appLocale,
    publicPath: target.section.publicPath ?? target.set.publicPath,
  });
}
