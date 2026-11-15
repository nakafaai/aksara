import { Schema } from "effect";

import { TextSchema } from "#contracts/visual/card";
import { markup } from "#contracts/visual/entry";

/**
 * Props of a component that takes none, such as a layout that only groups its
 * children. An empty struct would accept any object, so no key is allowed.
 */
export const NoPropsSchema = Schema.Record(Schema.String, Schema.Never);

/** Props of `Highlight`: a marked phrase in the warning or the success tone. */
const HighlightSchema = Schema.Struct({
  variant: Schema.optionalKey(Schema.Literals(["success", "warning"])),
});

/** Props of `CodeBlock`: one or more named sources, shown as tabs. */
const CodeBlockSchema = Schema.Struct({
  data: Schema.NonEmptyArray(
    Schema.Struct({
      code: Schema.String.check(Schema.isNonEmpty()),
      filename: TextSchema,
      language: TextSchema,
    })
  ),
});

/**
 * The components that shape text and layout. `AgentContext` holds text for
 * agents only and draws nothing; a block, a stack, and a grid group their
 * children; a highlight marks a phrase; a code block shows sources.
 */
export function layoutVisuals() {
  return {
    AgentContext: markup(NoPropsSchema),
    CodeBlock: markup(CodeBlockSchema),
    ContentBlock: markup(NoPropsSchema),
    ContentGrid: markup(NoPropsSchema),
    ContentStack: markup(NoPropsSchema),
    Highlight: markup(HighlightSchema),
  };
}
