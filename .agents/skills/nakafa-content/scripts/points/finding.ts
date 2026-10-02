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
