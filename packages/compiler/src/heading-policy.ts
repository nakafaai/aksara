import {
  type ContentKey,
  ContentKeySchema,
} from "@nakafa/aksara-contracts/ids";
import { Effect, Schema } from "effect";
import type { Heading, Root } from "mdast";
import { toString as mdastToString } from "mdast-util-to-string";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const LIST_HEADING_MARKER =
  /^(?:[0-9]{1,9}[.):]|\([0-9]{1,9}\)|[A-Za-z][.):]|\([A-Za-z]\)|[-+*•])(?=\s|$)/u;

/** Source location and marker for one list-shaped authored heading. */
const AuthoredListHeadingOccurrenceSchema = Schema.Struct({
  column: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThan(0))
  ),
  depth: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThan(0))
  ),
  line: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThan(0))
  ),
  marker: Schema.Trimmed.check(Schema.isNonEmpty()),
});
type AuthoredListHeadingOccurrence =
  typeof AuthoredListHeadingOccurrenceSchema.Type;

/** Authored headings must name concepts instead of encoding list items. */
export class AuthoredListHeadingError extends Schema.TaggedError<AuthoredListHeadingError>()(
  "AuthoredListHeadingError",
  {
    contentKey: ContentKeySchema,
    occurrences: Schema.Array(AuthoredListHeadingOccurrenceSchema).pipe(
      Schema.check(Schema.isMinLength(1))
    ),
  }
) {}

/** Creates one source occurrence when a heading begins with a list marker. */
function listHeadingOccurrence(
  node: Heading
): AuthoredListHeadingOccurrence | undefined {
  const match = LIST_HEADING_MARKER.exec(mdastToString(node).trim());
  if (!match) {
    return;
  }
  const start = node.position?.start;
  return {
    column: start?.column ?? 1,
    depth: node.depth,
    line: start?.line ?? 1,
    marker: match[0],
  };
}

/** Creates one compiler policy for recording and rejecting list-shaped headings. */
export function createHeadingPolicy(contentKey: ContentKey) {
  const occurrences: AuthoredListHeadingOccurrence[] = [];
  /** Records list-shaped headings during the remark pass. */
  const remarkPlugin: Plugin<[], Root> = () => (tree) => {
    visit(tree, "heading", (node) => {
      const occurrence = listHeadingOccurrence(node);
      if (occurrence) {
        occurrences.push(occurrence);
      }
    });
  };

  /** Rejects every occurrence recorded by the completed remark pass. */
  const validate = Effect.fn("AksaraCompiler.validateHeadingPolicy")(
    function* () {
      if (occurrences.length === 0) {
        return;
      }
      return yield* new AuthoredListHeadingError({
        contentKey,
        occurrences: [...occurrences],
      });
    }
  );

  return { remarkPlugin, validate };
}
