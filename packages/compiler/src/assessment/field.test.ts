import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";
import { compileReadingDocument } from "#compiler/assessment/document";
import type { Field } from "#compiler/assessment/error";
import { blocks, site } from "#compiler/test/assessment";

/** A typed gap, which may sit inside a line of text. */
const GAP: Field = { inline: true, interaction: "part-1", part: "1" };

/** A written answer, which needs a block of its own. */
const ESSAY: Field = { inline: false, interaction: "part-b", part: "b" };

/** Compiles a prompt with the test fields and names the placement it refuses and why. */
function refusal(rawMdx: string) {
  return blocks(rawMdx, [GAP, ESSAY]).pipe(
    Effect.flip,
    Effect.map((error) =>
      "element" in error ? [error.element, error.reason] : [error._tag]
    )
  );
}

describe("Field", () => {
  it.effect(
    "places a gap inside its line and a written answer on a line of its own",
    () =>
      Effect.gen(function* () {
        const result = yield* blocks(
          'Der Mensch le<Field part="1" />t seit langem.\n\n**b)** Begründe.\n\n<Field part="b" />',
          [GAP, ESSAY]
        );

        assert.deepStrictEqual(result, [
          {
            content: [
              { text: "Der Mensch le", type: "text" },
              {
                attrs: { gap: null, interaction: "part-1" },
                type: "inlineInteraction",
              },
              { text: "t seit langem.", type: "text" },
            ],
            type: "paragraph",
          },
          {
            content: [
              { marks: [{ type: "bold" }], text: "b)", type: "text" },
              { text: " Begründe.", type: "text" },
            ],
            type: "paragraph",
          },
          { attrs: { interaction: "part-b" }, type: "interaction" },
        ]);
      })
  );

  it.effect("places a gap on a line of its own as well", () =>
    Effect.gen(function* () {
      const result = yield* blocks('<Field part="1" />', [GAP]);

      assert.deepStrictEqual(result, [
        { attrs: { interaction: "part-1" }, type: "interaction" },
      ]);
    })
  );

  it.effect(
    "refuses a part the item lacks, other props, children, and a written answer inside a line",
    () =>
      Effect.gen(function* () {
        const placed = '<Field part="1" />\n\n<Field part="b" />';

        assert.deepStrictEqual(
          yield* refusal(`<Field part="c" />\n\n${placed}`),
          ['Field part="c"', "props"]
        );
        assert.deepStrictEqual(
          yield* refusal(`Text <Field part={1} /> here.\n\n${placed}`),
          ['Field part="?"', "props"]
        );
        assert.deepStrictEqual(
          yield* refusal(`<Field part="1" size="2" />\n\n<Field part="b" />`),
          ['Field part="1"', "props"]
        );
        assert.deepStrictEqual(
          yield* refusal('<Field part="1">x</Field>\n\n<Field part="b" />'),
          ['Field part="1"', "props"]
        );
        assert.deepStrictEqual(
          yield* refusal(
            '<Field part="1" />\n\nWrite <Field part="b" /> here.'
          ),
          ['Field part="b"', "placement"]
        );
      })
  );

  it.effect("requires each part to be placed exactly once", () =>
    Effect.gen(function* () {
      assert.deepStrictEqual(yield* refusal('<Field part="1" />'), [
        'Field part="b"',
        "placement",
      ]);
      assert.deepStrictEqual(
        yield* refusal(
          'A <Field part="1" /> and <Field part="1" />.\n\n<Field part="b" />'
        ),
        ['Field part="1"', "placement"]
      );
    })
  );

  it.effect(
    "refuses a field in the prompt of a single interaction and in a reading",
    () =>
      Effect.gen(function* () {
        const single = yield* blocks('<Field part="1" />').pipe(Effect.flip);
        const reading = yield* compileReadingDocument({
          ...site,
          rawMdx: '<Field part="1" />',
        }).pipe(Effect.flip);

        assert.strictEqual("reason" in single ? single.reason : "", "props");
        assert.strictEqual(reading._tag, "ContentTreeEvaluationError");
      })
  );
});
