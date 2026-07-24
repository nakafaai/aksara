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
  if ("sourcePath" in error && typeof error.sourcePath === "string") {
    return error.sourcePath;
  }
  if ("path" in error && typeof error.path === "string") {
    return error.path;
  }
  if ("contentKey" in error && typeof error.contentKey === "string") {
    return error.contentKey;
  }
}

/** Returns one non-sensitive field suitable for the loopback manifest. */
function publicDetail(error: PreviewDocumentError) {
  if ("reason" in error && typeof error.reason === "string") {
    return error.reason;
  }
  if ("stage" in error && typeof error.stage === "string") {
    return error.stage;
  }
  if ("field" in error && typeof error.field === "string") {
    return error.field;
  }
  if ("componentName" in error && typeof error.componentName === "string") {
    return error.componentName;
  }
}

/** Formats a bounded list while retaining evidence that entries were omitted. */
function diagnosticList(values: readonly string[]) {
  const visible = values.slice(0, MAX_DIAGNOSTIC_ITEMS);
  const remaining = values.length - visible.length;
  if (remaining === 0) {
    return visible.join(", ");
  }
  return `${visible.join(", ")}; ${remaining} more`;
}

/** Returns compiler-owned remediation context without serializing unknown causes. */
function compilerDetail(error: PreviewDocumentError) {
  switch (error._tag) {
    case "AuthoredMetadataDuplicateError":
      return `found ${error.count} metadata exports; keep exactly one`;
    case "AuthoredMetadataMissingError":
      return "add exactly one metadata export";
    case "AuthoredMetadataSyntaxError":
      return `unsupported metadata syntax: ${diagnosticList(error.reasons)}`;
    case "ContentByteLimitExceededError":
      return `${error.field} is ${error.actualBytes} bytes; maximum is ${error.maxBytes}`;
    case "ExecutablePolicyError":
      return `rejected executable syntax: ${diagnosticList(
        error.violations.map(({ identifier, rule }) => {
          if (identifier === undefined) {
            return rule;
          }
          return `${rule} (${identifier})`;
        })
      )}`;
    case "MdxCompilationError":
      return error.message;
    case "RendererComponentMissingError":
      return `register renderer component ${error.componentName} before using it`;
    case "UnsupportedMdxModuleSyntaxError":
      return `remove MDX module syntax at ${diagnosticList(
        error.occurrences.map(
          ({ column, kind, line }) => `${line}:${column} (${kind})`
        )
      )}`;
    default:
      return publicDetail(error);
  }
}

/** Joins one typed failure identity with optional bounded context. */
function failureMessage(
  code: string,
  location: string | undefined,
  detail: string | undefined,
  maxLength: number
) {
  const parts = [code];
  if (location !== undefined) {
    parts.push(`at ${location}`);
  }
  if (detail !== undefined) {
    parts.push(`(${detail})`);
  }
  return `${boundDiagnostic(parts.join(" "), maxLength - 1)}.`;
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
