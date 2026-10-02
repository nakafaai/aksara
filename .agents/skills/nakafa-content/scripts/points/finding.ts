import { issueAtOffset } from "#nakafa-content/math/finding";

export type PointsRule =
  | "interactive-visuals-fell"
  | "literal-points"
  | "long-decimal";

/** One violation of the points gate at a position inside one document. */
export interface PointsFinding {
  readonly column: number;
  readonly line: number;
  readonly message: string;
  readonly rule: PointsRule;
}

/** Builds one finding at an absolute source offset of the document. */
export function findingAt(
  source: string,
  offset: number,
  rule: PointsRule,
  message: string
): PointsFinding {
  const { column, line } = issueAtOffset(source, offset, rule);
  return { column, line, message, rule };
}
