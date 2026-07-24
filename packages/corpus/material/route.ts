import type { ContentLocale } from "@nakafa/aksara-contracts/content";
import { PublicPathSchema } from "@nakafa/aksara-contracts/ids";

import {
  type MaterialDomainDescriptor,
  materialDomainRoute,
} from "#corpus/material/domain";
import type {
  LessonMaterialSection,
  LessonMaterialSource,
} from "#corpus/material/schema";

const routeNamespaces = {
  en: "subjects",
  id: "materi",
};

/** Derives one canonical localized material-topic route. */
export function materialTopicPath(
  source: LessonMaterialSource,
  descriptor: MaterialDomainDescriptor,
  locale: ContentLocale
) {
  return PublicPathSchema.make(
    [
      routeNamespaces[locale],
      materialDomainRoute(descriptor, locale),
      source.routeSlugs[locale],
    ].join("/")
  );
}

/** Derives one canonical localized material-section route. */
export function materialLessonPath(
  source: LessonMaterialSource,
  section: LessonMaterialSection,
  descriptor: MaterialDomainDescriptor,
  locale: ContentLocale
) {
  return PublicPathSchema.make(
    `${materialTopicPath(source, descriptor, locale)}/${section.routeSlugs[locale]}`
  );
}
