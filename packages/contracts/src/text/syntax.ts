const LOWER_KEBAB_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const LOWER_KEBAB_PATH_PATTERN =
  /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/u;
const HTTPS_URL_PATTERN = /^https:\/\/\S+$/u;

/** Checks one lowercase kebab-case segment without owning its domain meaning. */
export function isLowerKebab(value: string) {
  return LOWER_KEBAB_PATTERN.test(value);
}

/** Checks one slash-separated path of lowercase kebab-case segments. */
export function isLowerKebabPath(value: string) {
  return LOWER_KEBAB_PATH_PATTERN.test(value);
}

/** Checks one whitespace-free absolute HTTPS source URL. */
export function isHttpsUrl(value: string) {
  return HTTPS_URL_PATTERN.test(value);
}
