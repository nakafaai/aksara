const URI_SCHEME_PATTERN = /^[A-Za-z][A-Za-z\d+.-]*:/u;
const PROTOCOL_RELATIVE_PATTERN = /^\/\//u;
const EXPLICIT_EXTERNAL_PATTERN = /(?:(?:https?|ftp):\/\/|(?:mailto|tel):)/iu;
const EMBEDDED_PROTOCOL_RELATIVE_PATTERN =
  /(?:^|[\s("'=])(\/\/(?=[A-Za-z\d.-]+\.[A-Za-z]{2,}(?:[/:?#]|$)))/iu;
const NON_WHITESPACE_PATTERN = /\S/u;
const DESTINATION_ATTRIBUTES = new Set([
  "action",
  "formaction",
  "href",
  "poster",
  "source",
  "src",
  "to",
  "uri",
  "url",
]);
const DESTINATION_ATTRIBUTE_SUFFIXES = ["uri", "url"] as const;

export interface ExternalMatch {
  index: number;
  value: string;
}

/** Recognizes every absolute or protocol-relative external destination. */
export function isExternalDestination(destination: string): boolean {
  const normalized = destination.trim();
  return (
    PROTOCOL_RELATIVE_PATTERN.test(normalized) ||
    URI_SCHEME_PATTERN.test(normalized)
  );
}

/** Finds an explicit external protocol without mistaking ordinary colons. */
function explicitExternalMatch(text: string): ExternalMatch | undefined {
  const match = EXPLICIT_EXTERNAL_PATTERN.exec(text);
  if (match?.index !== undefined) {
    return { index: match.index, value: match[0] };
  }
  const protocolRelative = EMBEDDED_PROTOCOL_RELATIVE_PATTERN.exec(text);
  const value = protocolRelative?.[1];
  if (protocolRelative?.index === undefined || value === undefined) {
    return;
  }
  return {
    index: protocolRelative.index + protocolRelative[0].indexOf(value),
    value,
  };
}

/** Matches a complete destination only when the whole value is external. */
function completeExternalMatch(text: string): ExternalMatch | undefined {
  if (!isExternalDestination(text)) {
    return;
  }
  return {
    index: Math.max(0, text.search(NON_WHITESPACE_PATTERN)),
    value: text.trim(),
  };
}

/** Applies the stricter whole-value rule only to destination fields. */
export function externalMatch(
  text: string,
  destinationAttribute: boolean
): ExternalMatch | undefined {
  return destinationAttribute
    ? completeExternalMatch(text)
    : explicitExternalMatch(text);
}

/** Recognizes exact and domain-specific JSX destination field names. */
export function isDestinationAttribute(name: string | undefined): boolean {
  if (!name) {
    return false;
  }
  const normalized = name.toLowerCase();
  return (
    DESTINATION_ATTRIBUTES.has(normalized) ||
    DESTINATION_ATTRIBUTE_SUFFIXES.some((suffix) => normalized.endsWith(suffix))
  );
}
