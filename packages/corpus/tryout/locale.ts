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
    scope: Schema.Literals(["country", "exam", "track", "set", "section"]),
  }
) {}

/** Requires locale-owned nodes to preserve the exact embedded key order. */
function hasExactKeys(
  base: readonly { readonly key: string }[],
  overlay: readonly { readonly key: string }[]
) {
  return (
    base.length === overlay.length &&
    base.every(({ key }, index) => key === overlay[index]?.key)
  );
}

/** Composes one reviewed locale overlay over exact stable embedded facts. */
export const composeTryoutLocaleExam = Effect.fn(
  "AksaraCorpus.composeTryoutLocaleExam"
)(function* (base: TryoutExamSource, overlay: TryoutLocaleExam) {
  const { appLocale } = overlay;
  if (base.countryKey !== overlay.country.key) {
    return yield* new TryoutLocaleOwnershipError({
      examKey: base.examKey,
      key: overlay.country.key,
      scope: "country",
    });
  }
  if (base.examKey !== overlay.exam.key) {
    return yield* new TryoutLocaleOwnershipError({
      examKey: base.examKey,
      key: overlay.exam.key,
      scope: "exam",
    });
  }
  if (!hasExactKeys(base.tracks, overlay.tracks)) {
    return yield* new TryoutLocaleOwnershipError({
      examKey: base.examKey,
      key: base.examKey,
      scope: "track",
    });
  }
  const tracks: TryoutExamSource["tracks"][number][] = [];
  for (const [track, trackOverlay] of EffectArray.zip(
    base.tracks,
    overlay.tracks
  )) {
    if (!hasExactKeys(track.sets, trackOverlay.sets)) {
      return yield* new TryoutLocaleOwnershipError({
        examKey: base.examKey,
        key: track.key,
        scope: "set",
      });
    }
    const sets: TryoutExamSource["tracks"][number]["sets"][number][] = [];
    for (const [set, setOverlay] of EffectArray.zip(
      track.sets,
      trackOverlay.sets
    )) {
      if (!hasExactKeys(set.sections, setOverlay.sections)) {
        return yield* new TryoutLocaleOwnershipError({
          examKey: base.examKey,
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
        trackOverlay.routeSlug
      ),
      sets,
      translations: addLocalizedSource(
        track.translations,
        appLocale,
        trackOverlay.translation
      ),
    });
  }
  return {
    ...base,
    countryRouteSlugs: addLocalizedSource(
      base.countryRouteSlugs,
      appLocale,
      overlay.country.routeSlug
    ),
    countryTranslations: addLocalizedSource(
      base.countryTranslations,
      appLocale,
      overlay.country.translation
    ),
    examRouteSlugs: addLocalizedSource(
      base.examRouteSlugs,
      appLocale,
      overlay.exam.routeSlug
    ),
    examTranslations: addLocalizedSource(
      base.examTranslations,
      appLocale,
      overlay.exam.translation
    ),
    overlayAppLocale: overlay.appLocale,
    tracks,
  } satisfies LocalizedTryoutExamSource;
});
