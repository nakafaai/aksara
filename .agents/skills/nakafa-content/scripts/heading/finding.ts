/**
 * One outline or heading finding of a page: the line it points at, the rule,
 * a message that names the fix, and whether it fails the gate or asks for a
 * review.
 */
export interface HeadingFinding {
  readonly blocking: boolean;
  readonly line: number;
  readonly message: string;
  readonly rule: string;
}
