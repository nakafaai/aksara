import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";
import { blocks } from "#compiler/test/assessment";

describe("blockChildren", () => {
  it.effect(
    "reads tight list items, fragments, and a mark set twice as one",
    () =>
      Effect.gen(function* () {
        const [list] = yield* blocks("- **a** and b\n- c");
        const [fragment] = yield* blocks("<>\n\nIn a fragment.\n\n</>");
        const [nested] = yield* blocks("<strong>a <strong>b</strong></strong>");
        const [empty, heading] = yield* blocks("- <strong></strong>\n\n#");
        const [counted] = yield* blocks("1. a\n2. b");

        assert.deepStrictEqual(
          list?.type === "bulletList" && list.content[0]?.content[0],
          {
            content: [
              { marks: [{ type: "bold" }], text: "a", type: "text" },
              { text: " and b", type: "text" },
            ],
            type: "paragraph",
          }
        );
        assert.deepStrictEqual(fragment, {
          content: [{ text: "In a fragment.", type: "text" }],
          type: "paragraph",
        });
        assert.deepStrictEqual(
          empty?.type === "bulletList" && empty.content[0]?.content,
          [{ type: "paragraph" }]
        );
        assert.deepStrictEqual(heading, {
          attrs: { level: 1 },
          type: "heading",
        });
        assert.deepStrictEqual(
          counted?.type === "orderedList" && counted.attrs,
          { start: 1 }
        );
        assert.deepStrictEqual(nested, {
          content: [{ marks: [{ type: "bold" }], text: "a b", type: "text" }],
          type: "paragraph",
        });
      })
  );
});
