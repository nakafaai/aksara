import { PublicPathSchema } from "@nakafa/aksara-contracts/ids";
import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import { materialPublicNamespace } from "@nakafa/aksara-contracts/projection/material";
import { Effect } from "effect";
import { requireSourceLocale } from "#corpus/locale/source";
import type { MaterialDomainDescriptor } from "#corpus/material/domain";
import type {
  LessonMaterialSection,
  LessonMaterialSource,
} from "#corpus/material/schema";

/** Derives one canonical localized material-topic route. */
export const materialTopicPath = Effect.fn("AksaraCorpus.materialTopicPath")(
  function* (
    source: LessonMaterialSource,
    descriptor: MaterialDomainDescriptor,
    appLocale: AppLocale
  ) {
    const [resolvedDomainSlug, topicSlug] = yield* Effect.all(
      [
        requireSourceLocale(descriptor.routeSlugs, appLocale, descriptor.key),
        requireSourceLocale(source.routeSlugs, appLocale, source.key),
      ],
      { concurrency: 2 }
    );
    return PublicPathSchema.make(
      [materialPublicNamespace(appLocale), resolvedDomainSlug, topicSlug].join(
        "/"
      )
    );
  }
);

/** Derives one canonical localized material-section route. */
export const materialLessonPath = Effect.fn("AksaraCorpus.materialLessonPath")(
  function* (
    source: LessonMaterialSource,
    section: LessonMaterialSection,
    descriptor: MaterialDomainDescriptor,
    appLocale: AppLocale
  ) {
    const [topicPath, sectionSlug] = yield* Effect.all(
      [
        materialTopicPath(source, descriptor, appLocale),
        requireSourceLocale(section.routeSlugs, appLocale, source.key),
      ],
      { concurrency: 2 }
    );
    return PublicPathSchema.make(`${topicPath}/${sectionSlug}`);
  }
);
