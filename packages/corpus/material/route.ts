import { PublicPathSchema } from "@nakafa/aksara-contracts/ids";
import {
  type ActiveAppLocale,
  activeAppLocaleCode,
} from "@nakafa/aksara-contracts/locale";
import { materialPublicNamespace } from "@nakafa/aksara-contracts/projection/material";

import {
  type MaterialDomainDescriptor,
  materialDomainRoute,
} from "#corpus/material/domain";
import type {
  LessonMaterialSection,
  LessonMaterialSource,
} from "#corpus/material/schema";

/** Derives one canonical localized material-topic route. */
export function materialTopicPath(
  source: LessonMaterialSource,
  descriptor: MaterialDomainDescriptor,
  appLocale: ActiveAppLocale
) {
  const appLocaleCode = activeAppLocaleCode(appLocale);
  return PublicPathSchema.make(
    [
      materialPublicNamespace(appLocale),
      materialDomainRoute(descriptor, appLocale),
      source.routeSlugs[appLocaleCode],
    ].join("/")
  );
}

/** Derives one canonical localized material-section route. */
export function materialLessonPath(
  source: LessonMaterialSource,
  section: LessonMaterialSection,
  descriptor: MaterialDomainDescriptor,
  appLocale: ActiveAppLocale
) {
  const appLocaleCode = activeAppLocaleCode(appLocale);
  return PublicPathSchema.make(
    `${materialTopicPath(source, descriptor, appLocale)}/${section.routeSlugs[appLocaleCode]}`
  );
}
