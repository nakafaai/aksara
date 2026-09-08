import { assert, describe, it } from "@effect/vitest";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";
import { Effect } from "effect";
import { validateQuestionLabels } from "#corpus/question-bank/label";

const sourcePath = CorpusSourcePathSchema.make(
  "packages/corpus/question-bank/tryout/indonesia/tka/mathematics/test-set/question-1/item.ts"
);

/** Builds one valid source item around the label being inspected. */
function choice(label: string): QuestionItem {
  return {
    responses: {
      en: {
        kind: "single-choice",
        options: [
          { isCorrect: true, label },
          { isCorrect: false, label: "Another response" },
        ],
      },
      id: undefined,
    },
  };
}

describe("question label source validation", () => {
  it.effect.each([
    "The result is $$x=4$$.",
    "$$\\frac{1}{3}$$",
    "$$52{,}3\\%$$",
    "The prose reports 50% participation.",
    "**One** option with *emphasis*.",
    "The price is \\$5.",
    "The prices are \\$5 and \\$6.",
    "The code is `$value`.",
    "The expression is `price * quantity`.",
    'The code is `const currency = "$5 and $10"`.',
    "The code is `const text = '$50%$'`.",
    "The regex escape is `\\(`.",
    "The component name is `<InlineMath />`.",
    "~~~mathematics\nx\n~~~",
    "```python\nprint('$')\n```",
    "```python\nprint('\\(x\\)')\n```",
    '```typescript\nconst formula = "<InlineMath math=\\"50%\\" />";\n```',
    "[Reference](https://example.org/$value)",
    "https://example.org/$value",
  ])("preserves inline math and protected Markdown in %s", (label) =>
    validateQuestionLabels(choice(label), sourcePath)
  );

  it.effect.each([
    { label: "$3$", reason: "dollar" },
    { label: "$$52{,}3%$$", reason: "comment" },
    { label: "\\[x=4\\]", reason: "syntax" },
    { label: "\\(50%\\)", reason: "syntax" },
    { label: "`$x$`", reason: "syntax" },
    { label: "`$$50%$$`", reason: "syntax" },
    { label: "`const x = $x=50%$`", reason: "syntax" },
    { label: "`const x = $2+3$`", reason: "syntax" },
    { label: "`const x = $x$`", reason: "syntax" },
    { label: "`\\(x\\)`", reason: "syntax" },
    { label: "<math>x=4</math>", reason: "syntax" },
    { label: '<BlockMath math="x=4" />', reason: "syntax" },
    { label: '<InlineMath math="50%" />', reason: "syntax" },
    { label: "`<math>x=4</math>`", reason: "syntax" },
    { label: "```math x=4```", reason: "syntax" },
    { label: "```\n$x=4$\n```", reason: "display" },
    { label: "   ```\n$x=4$\n   ```", reason: "display" },
    { label: "~~~\n$x=4$\n~~~", reason: "display" },
    { label: "   ~~~\n$$x=4$$\n   ~~~", reason: "display" },
    { label: "    $x=4$", reason: "display" },
    { label: "```mathematics\nx=4\n```", reason: "display" },
    { label: "&#36;x&#36;", reason: "dollar" },
    { label: "&dollar;x&dollar;", reason: "dollar" },
    { label: "\\$5 and &#36;x&#36;", reason: "dollar" },
    { label: "$$\frac{1}{2}$$", reason: "control" },
    { label: "$$x\rightarrow y$$", reason: "control" },
    { label: "$$x\times y$$", reason: "spacing" },
    { label: "\u007f", reason: "control" },
    { label: "$$x", reason: "display" },
    { label: "A $x$ term", reason: "dollar" },
    { label: "[$x$](https://example.org)", reason: "dollar" },
    { label: "$$\nx=4\n$$", reason: "display" },
    { label: "```math\nx=4\n```", reason: "display" },
    { label: "$$ x $$", reason: "spacing" },
    { label: "$$ x$$", reason: "spacing" },
    { label: "$$x $$", reason: "spacing" },
    { label: "The result is $$x\n+y$$.", reason: "spacing" },
    { label: "$$$x$$$", reason: "spacing" },
  ])("rejects the broken or display label $label", ({ label, reason }) =>
    Effect.gen(function* () {
      const failure = yield* Effect.flip(
        validateQuestionLabels(choice(label), sourcePath)
      );
      assert.strictEqual(failure._tag, "QuestionLabelError");
      assert.strictEqual(failure.reason, reason);
      assert.strictEqual(failure.sourcePath, sourcePath);
      assert.strictEqual(failure.labelPath, "responses.en.options[0].label");
    })
  );

  it.effect("checks both category names and statement labels", () =>
    Effect.gen(function* () {
      const item: QuestionItem = {
        responses: {
          id: {
            categories: ["Benar", "Salah"],
            kind: "category",
            statements: [{ correctCategoryOrder: 1, label: "$$x=3$$" }],
          },
        },
      };
      yield* validateQuestionLabels(item, sourcePath);
      const response = item.responses.id;
      assert.ok(response?.kind === "category");
      response.statements[0] = { correctCategoryOrder: 1, label: "$x=3$" };
      const statement = yield* Effect.flip(
        validateQuestionLabels(item, sourcePath)
      );
      assert.strictEqual(
        statement.labelPath,
        "responses.id.statements[0].label"
      );
      response.categories[1] = "$0$";
      const category = yield* Effect.flip(
        validateQuestionLabels(item, sourcePath)
      );
      assert.strictEqual(category.labelPath, "responses.id.categories[1]");
    })
  );
});
