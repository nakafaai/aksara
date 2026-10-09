import { Array as Arr, Match, Predicate } from "effect";
import type { PreviewDocumentError } from "#cli/document";

const MAX_DIAGNOSTIC_ITEMS = 8;
const MAX_DIAGNOSTIC_LENGTH = 1024;
const MAX_PUBLIC_LENGTH = 512;

/** Keeps one author-facing diagnostic single-line and within its wire bound. */
function boundDiagnostic(value: string, maxLength: number) {
  return value.replaceAll(/\s+/g, " ").trim().slice(0, maxLength);
}

/** Returns the safest authored identity carried by one typed failure. */
function failureLocation(error: PreviewDocumentError) {
  if (
    Predicate.hasProperty(error, "sourcePath") &&
    Predicate.isString(error.sourcePath)
  ) {
    return error.sourcePath;
  }
  if (Predicate.hasProperty(error, "path") && Predicate.isString(error.path)) {
    return error.path;
  }
  if (
    Predicate.hasProperty(error, "contentKey") &&
    Predicate.isString(error.contentKey)
  ) {
    return error.contentKey;
  }
}

/** Returns one non-sensitive field suitable for the loopback manifest. */
function publicDetail(error: PreviewDocumentError) {
  if (
    Predicate.hasProperty(error, "reason") &&
    Predicate.isString(error.reason)
  ) {
    return error.reason;
  }
  if (
    Predicate.hasProperty(error, "stage") &&
    Predicate.isString(error.stage)
  ) {
    return error.stage;
  }
  if (
    Predicate.hasProperty(error, "field") &&
    Predicate.isString(error.field)
  ) {
    return error.field;
  }
  if (
    Predicate.hasProperty(error, "componentName") &&
    Predicate.isString(error.componentName)
  ) {
    return error.componentName;
  }
}

/** Formats a bounded list while retaining evidence that entries were omitted. */
function diagnosticList(values: readonly string[]) {
  const visible = Arr.take(values, MAX_DIAGNOSTIC_ITEMS);
  const remaining = values.length - visible.length;
  if (remaining === 0) {
    return Arr.join(visible, ", ");
  }
  return `${Arr.join(visible, ", ")}; ${remaining} more`;
}

/** Returns compiler-owned remediation context without serializing unknown causes. */
const compilerDetail = Match.type<PreviewDocumentError>().pipe(
  Match.discriminators("_tag")({
    AuthoredMetadataDuplicateError: (error) =>
      `found ${error.count} metadata exports; keep exactly one`,
    AuthoredMetadataMissingError: () => "add exactly one metadata export",
    AuthoredMetadataSyntaxError: (error) =>
      `unsupported metadata syntax: ${diagnosticList(error.reasons)}`,
    ContentByteLimitExceededError: (error) =>
      `${error.field} is ${error.actualBytes} bytes; maximum is ${error.maxBytes}`,
    ExecutablePolicyError: (error) =>
      `rejected executable syntax: ${diagnosticList(
        Arr.map(error.violations, ({ identifier, rule }) => {
          if (identifier === undefined) {
            return rule;
          }
          return `${rule} (${identifier})`;
        })
      )}`,
    MdxCompilationError: (error) => error.message,
    RendererComponentMissingError: (error) =>
      `register renderer component ${error.componentName} before using it`,
    UnsupportedMdxModuleSyntaxError: (error) =>
      `remove MDX module syntax at ${diagnosticList(
        Arr.map(
          error.occurrences,
          ({ column, kind, line }) => `${line}:${column} (${kind})`
        )
      )}`,
  }),
  Match.orElse(publicDetail)
);

/** Joins one typed failure identity with optional bounded context. */
function failureMessage(
  code: string,
  location: string | undefined,
  detail: string | undefined,
  maxLength: number
) {
  const locationPart = location === undefined ? [] : [`at ${location}`];
  const detailPart = detail === undefined ? [] : [`(${detail})`];
  const parts = [code, ...locationPart, ...detailPart];
  return `${boundDiagnostic(Arr.join(parts, " "), maxLength - 1)}.`;
}

/** Produces separate public and trusted-CLI views of one document failure. */
export function describeDocumentFailure(error: PreviewDocumentError) {
  const code = error._tag.slice(0, 128);
  const location = failureLocation(error);
  return {
    diagnostic: failureMessage(
      code,
      location,
      compilerDetail(error),
      MAX_DIAGNOSTIC_LENGTH
    ),
    publicFailure: {
      code,
      message: failureMessage(
        code,
        location,
        publicDetail(error),
        MAX_PUBLIC_LENGTH
      ),
    },
  };
}
