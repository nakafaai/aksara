import { assert, describe, it } from "@effect/vitest";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import type { ContentTreeElement } from "@nakafa/aksara-contracts/tree";
import { Effect, Schema } from "effect";
import { checkTreeVisuals, TreeRichSchema } from "#compiler/tree/catalog";

const site = {
  contentKey: ContentKeySchema.make("test:lesson"),
  sourcePath: CorpusSourcePathSchema.make(
    "packages/corpus/material/lesson/test/en.mdx"
  ),
};

/** Builds one element of a content tree. */
function element(
  name: string,
  props: ContentTreeElement["props"],
  children: ContentTreeElement["children"] = []
): ContentTreeElement {
  return { $node: "element", children, name, props };
}

/** A machine whose title holds a formula, as a lesson writes it. */
const machine = element("FunctionMachine", {
  description: "Doubles its input.",
  inputLabel: "Input",
  title: element("fragment", {}, [
    "Machine ",
    element("InlineMath", { math: "f" }),
  ]),
});

describe("checkTreeVisuals", () => {
  it.effect(
    "accepts a tree whose components take the props of their schemas",
    () =>
      checkTreeVisuals(
        element("fragment", {}, [element("p", {}, ["Text."]), machine]),
        site
      )
  );

  it.effect(
    "refuses a component outside the catalog and props its schema refuses",
    () =>
      Effect.gen(function* () {
        const unknown = yield* checkTreeVisuals(
          element("fragment", {}, [element("Widget", {})]),
          site
        ).pipe(Effect.flip);
        const props = yield* checkTreeVisuals(
          element("fragment", {}, [
            element("ContentStack", {}, [
              element("FunctionMachine", { ...machine.props, inputLabel: 3 }),
            ]),
          ]),
          site
        ).pipe(Effect.flip);
        const nested = yield* checkTreeVisuals(
          element("fragment", {}, [
            element("ContentStack", {
              note: [{ inner: element("FunctionMachine", {}) }],
            }),
          ]),
          site
        ).pipe(Effect.flip);

        assert.deepStrictEqual(
          [unknown.reason, unknown.component, props.reason, nested.component],
          ["unknown", "Widget", "props", "ContentStack"]
        );
      })
  );
});

describe("TreeRichSchema", () => {
  it.effect("reads rich text from a tree and never writes it back", () =>
    Effect.gen(function* () {
      const rich = yield* Schema.decodeUnknownEffect(TreeRichSchema)("Plain");
      const refused = yield* Schema.decodeUnknownEffect(TreeRichSchema)(
        element("fragment", {}, ["A", element("br", {}), "B"])
      ).pipe(Effect.flip);
      const written = yield* Schema.encodeUnknownEffect(TreeRichSchema)(
        rich
      ).pipe(Effect.flip);

      assert.deepStrictEqual(rich, [{ text: "Plain", type: "text" }]);
      assert.strictEqual(refused._tag, "SchemaError");
      assert.strictEqual(written._tag, "SchemaError");
    })
  );
});
