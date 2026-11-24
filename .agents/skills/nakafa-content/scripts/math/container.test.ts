import { assert, it } from "@effect/vitest";
import {
  withoutMathContainers,
  wrapsMathStackOnly,
} from "#nakafa-content/math/container";

const BASE =
  'Step one.\n\n<BlockMath math="x + 2 = 5" />\n\n<BlockMath math="x = 3" />\n\nDone.\n';
const WRAPPED =
  'Step one.\n\n<MathContainer>\n<BlockMath math="x + 2 = 5" />\n<BlockMath math="x = 3" />\n</MathContainer>\n\nDone.\n';

it("recognizes a MathContainer-only wrap while rejecting any prose or formula edit", () => {
  assert.equal(withoutMathContainers(BASE), withoutMathContainers(WRAPPED));
  assert.equal(wrapsMathStackOnly(BASE, WRAPPED), true);
  assert.equal(wrapsMathStackOnly(BASE, BASE), false);
  assert.equal(
    wrapsMathStackOnly(BASE, WRAPPED.replace("Done.", "Finished.")),
    false
  );
  assert.equal(
    wrapsMathStackOnly(BASE, WRAPPED.replace("x = 3", "x = 4")),
    false
  );
});
