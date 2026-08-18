import { TryoutKeySchema } from "@nakafa/aksara-contracts/tryout/key";
import { Effect, Array as EffectArray, Schema } from "effect";

import {
  addLocalizedSource,
  LocaleOverlayAppLocaleSchema,
} from "#corpus/locale/source";
import { PublicRouteSegmentSchema } from "#corpus/route/schema";
import type { TryoutExamSource } from "#corpus/tryout/schema";

const TryoutLocaleTranslationSchema = Schema.Struct({
  description: Schema.optional(Schema.String),
  title: Schema.String,
});

const TryoutLocaleNodeSchema = Schema.Struct({
  key: TryoutKeySchema,
  routeSlug: PublicRouteSegmentSchema,
  translation: TryoutLocaleTranslationSchema,
});

export const TryoutLocaleExamSchema = Schema.Struct({
  appLocale: LocaleOverlayAppLocaleSchema,
  country: TryoutLocaleNodeSchema,
  exam: TryoutLocaleNodeSchema,
  tracks: Schema.Array(
    Schema.Struct({
      ...TryoutLocaleNodeSchema.fields,
      sets: Schema.Array(
        Schema.Struct({
          ...TryoutLocaleNodeSchema.fields,
          sections: Schema.Array(TryoutLocaleNodeSchema),
        })
      ),
    })
  ),
});
export type TryoutLocaleExam = typeof TryoutLocaleExamSchema.Type;

/** Complete hierarchy after exact locale-owned copy composition. */
export type LocalizedTryoutExamSource = TryoutExamSource & {
  readonly overlayAppLocale: TryoutLocaleExam["appLocale"];
};

/** Locale-owned Try-out copy does not close over its stable embedded hierarchy. */
export class TryoutLocaleOwnershipError extends Schema.TaggedError<TryoutLocaleOwnershipError>()(
  "TryoutLocaleOwnershipError",
  {
    examKey: TryoutKeySchema,
    key: TryoutKeySchema,
    scope: Schema.Literal("country", "exam", "track", "set", "section"),
  }
) {}

/** Requires locale-owned nodes to preserve the exact embedded key order. */
function hasExactKeys(
  active: readonly { readonly key: string }[],
  candidate: readonly { readonly key: string }[]
) {
  return (
    active.length === candidate.length &&
    active.every(({ key }, index) => key === candidate[index]?.key)
  );
}

/** Composes one reviewed locale overlay over exact stable embedded facts. */
export const composeTryoutLocaleExam = Effect.fn(
  "AksaraCorpus.composeTryoutLocaleExam"
)(function* (active: TryoutExamSource, candidate: TryoutLocaleExam) {
  const { appLocale } = candidate;
  if (active.countryKey !== candidate.country.key) {
    return yield* new TryoutLocaleOwnershipError({
      examKey: active.examKey,
      key: candidate.country.key,
      scope: "country",
    });
  }
  if (active.examKey !== candidate.exam.key) {
    return yield* new TryoutLocaleOwnershipError({
      examKey: active.examKey,
      key: candidate.exam.key,
      scope: "exam",
    });
  }
  if (!hasExactKeys(active.tracks, candidate.tracks)) {
    return yield* new TryoutLocaleOwnershipError({
      examKey: active.examKey,
      key: active.examKey,
      scope: "track",
    });
  }
  const tracks: TryoutExamSource["tracks"][number][] = [];
  for (const [track, overlay] of EffectArray.zip(
    active.tracks,
    candidate.tracks
  )) {
    if (!hasExactKeys(track.sets, overlay.sets)) {
      return yield* new TryoutLocaleOwnershipError({
        examKey: active.examKey,
        key: track.key,
        scope: "set",
      });
    }
    const sets: TryoutExamSource["tracks"][number]["sets"][number][] = [];
    for (const [set, setOverlay] of EffectArray.zip(track.sets, overlay.sets)) {
      if (!hasExactKeys(set.sections, setOverlay.sections)) {
        return yield* new TryoutLocaleOwnershipError({
          examKey: active.examKey,
          key: set.key,
          scope: "section",
        });
      }
      const sections: TryoutExamSource["tracks"][number]["sets"][number]["sections"][number][] =
        [];
      for (const [section, sectionOverlay] of EffectArray.zip(
        set.sections,
        setOverlay.sections
      )) {
        sections.push({
          ...section,
          routeSlugs: addLocalizedSource(
            section.routeSlugs,
            appLocale,
            sectionOverlay.routeSlug
          ),
          translations: addLocalizedSource(
            section.translations,
            appLocale,
            sectionOverlay.translation
          ),
        });
      }
      sets.push({
        ...set,
        routeSlugs: addLocalizedSource(
          set.routeSlugs,
          appLocale,
          setOverlay.routeSlug
        ),
        sections,
        translations: addLocalizedSource(
          set.translations,
          appLocale,
          setOverlay.translation
        ),
      });
    }
    tracks.push({
      ...track,
      routeSlugs: addLocalizedSource(
        track.routeSlugs,
        appLocale,
        overlay.routeSlug
      ),
      sets,
      translations: addLocalizedSource(
        track.translations,
        appLocale,
        overlay.translation
      ),
    });
  }
  return {
    ...active,
    countryRouteSlugs: addLocalizedSource(
      active.countryRouteSlugs,
      appLocale,
      candidate.country.routeSlug
    ),
    countryTranslations: addLocalizedSource(
      active.countryTranslations,
      appLocale,
      candidate.country.translation
    ),
    examRouteSlugs: addLocalizedSource(
      active.examRouteSlugs,
      appLocale,
      candidate.exam.routeSlug
    ),
    examTranslations: addLocalizedSource(
      active.examTranslations,
      appLocale,
      candidate.exam.translation
    ),
    overlayAppLocale: candidate.appLocale,
    tracks,
  } satisfies LocalizedTryoutExamSource;
});
