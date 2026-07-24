import type { ContentLocale } from "@nakafa/aksara-contracts/content";
import { PublicPathSchema } from "@nakafa/aksara-contracts/ids";

import type {
  LessonMaterialSection,
  LessonMaterialSource,
} from "#corpus/material/schema";

const routeNamespaces = {
  en: "subjects",
  id: "materi",
};

const domainRouteSlugs = {
  "ai-ds": { en: "ai-ds", id: "ai-ds" },
  biology: { en: "biology", id: "biologi" },
  chemistry: { en: "chemistry", id: "kimia" },
  mathematics: { en: "mathematics", id: "matematika" },
  physics: { en: "physics", id: "fisika" },
};

/** Derives one canonical localized material-topic route. */
export function materialTopicPath(
  source: LessonMaterialSource,
  locale: ContentLocale
) {
  return PublicPathSchema.make(
    [
      routeNamespaces[locale],
      domainRouteSlugs[source.domain][locale],
      source.routeSlugs[locale],
    ].join("/")
  );
}

/** Derives one canonical localized material-section route. */
export function materialLessonPath(
  source: LessonMaterialSource,
  section: LessonMaterialSection,
  locale: ContentLocale
) {
  return PublicPathSchema.make(
    `${materialTopicPath(source, locale)}/${section.routeSlugs[locale]}`
  );
}
