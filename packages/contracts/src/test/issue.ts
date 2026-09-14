import { Predicate, type Schema, type SchemaIssue } from "effect";

/** One authored filter issue that carries both a path and its message. */
export type AuthoredIssue = Readonly<{
  issue: string | SchemaIssue.Issue;
  path: readonly PropertyKey[];
}>;

/** Narrows one filter issue to the authored form used by tests. */
export function hasAuthoredIssue(
  issue: Schema.FilterIssue
): issue is AuthoredIssue {
  return (
    Predicate.hasProperty(issue, "path") &&
    Predicate.hasProperty(issue, "issue")
  );
}
