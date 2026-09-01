import { compile } from "@mdx-js/mdx";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { createMathVisualPolicy } from "#compiler/math-policy";
import { createSourcePolicy } from "#compiler/source-policy";

export const TEST_MATH_CONTENT_KEY = ContentKeySchema.make(
  "test:math-visual-policy"
);

/** Builds one schema-valid plane scene with optional static label anchors. */
export function planeScene(labels = "") {
  return `{
    space: "plane",
    frame: {
      kind: "cartesian",
      axes: "visible",
      grid: "visible",
      x: { min: -2, max: +2 },
      y: { min: -2, max: 2 },
    },
    view: { kind: "fit", padding: 0.25 },
    objects: [{
      id: "diagonal",
      kind: "segment",
      appearance: "primary",
      from: { x: -1, y: -1 },
      to: { x: 1, y: 1 },
    }],
    ${labels}
  }`;
}

/** Applies only the compiler-owned MathVisual policy to one MDX fixture. */
export const validateMathVisual = Effect.fn("MathVisualPolicyTest.validate")(
  function* (rawMdx: string) {
    const policy = createMathVisualPolicy(TEST_MATH_CONTENT_KEY);
    yield* Effect.promise(() =>
      compile(rawMdx, { remarkPlugins: [policy.remarkPlugin] })
    );
    yield* policy.validate();
  }
);

/** Applies the complete authored-source policy to one MDX fixture. */
export const validateMathSource = Effect.fn(
  "MathVisualPolicyTest.validateSource"
)(function* (rawMdx: string) {
  const policy = createSourcePolicy(
    TEST_MATH_CONTENT_KEY,
    new Set(["InlineMath", "MathVisual"])
  );
  yield* Effect.promise(() =>
    compile(rawMdx, { remarkPlugins: policy.remarkPlugins })
  );
  yield* policy.validate();
});

/** Returns the typed MathVisual policy failure for one invalid fixture. */
export const rejectMathVisual = Effect.fn("MathVisualPolicyTest.reject")(
  (rawMdx: string) => Effect.flip(validateMathVisual(rawMdx))
);
