import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";
import {
  planeScene,
  rejectMathVisual,
  validateMathSource,
  validateMathVisual,
} from "#compiler/test/math";

describe("MathVisual visible metadata", () => {
  it.effect("accepts static math as the complete visible metadata", () =>
    validateMathSource(`<MathVisual
      title={<InlineMath math="x+2y=20" />}
      description={<InlineMath math="3x+2y=36" />}
      scene={${planeScene()}}
    />`)
  );

  it.effect.each([
    'title={"Coordinate plane"}',
    "title={`Coordinate plane`}",
    "title={0}",
    "title={1n}",
    'title={<> {"Coordinate plane"} </>}',
    "title={<> {0} </>}",
    "title={<span>Coordinate plane</span>}",
    "title={<><span>Coordinate plane</span></>}",
    "title={<><>Coordinate plane</></>}",
    'title={<BlockMath math="x+2y=20" />}',
    'title={<InlineMath math={"x+2y=20"} />}',
    "title={<InlineMath math={`x+2y=20`} />}",
    'title={<InlineMath math="x+2y=20" errorColor="red" />}',
    'title={<InlineMath children="x+2y=20" />}',
    "title={<InlineMath>x+2y=20</InlineMath>}",
    'title={<InlineMath>{"x+2y=20"}</InlineMath>}',
    "title={<InlineMath>{`x+2y=20`}</InlineMath>}",
  ])("accepts the visible metadata form %s", (title) =>
    validateMathVisual(
      `<MathVisual ${title} description="A coordinate plane." scene={${planeScene()}} />`
    )
  );

  it.effect.each([
    ["title-empty", 'title description="A coordinate plane."'],
    ["title-empty", 'title="" description="A coordinate plane."'],
    ["title-empty", 'title={""} description="A coordinate plane."'],
    ["title-empty", 'title="   " description="A coordinate plane."'],
    ["title-empty", 'title={``} description="A coordinate plane."'],
    ["title-empty", 'title={`\\x20`} description="A coordinate plane."'],
    ["title-empty", 'title={null} description="A coordinate plane."'],
    ["title-empty", 'title={true} description="A coordinate plane."'],
    ["title-dynamic", 'title={/plane/} description="A coordinate plane."'],
    ["title-empty", 'title={<></>} description="A coordinate plane."'],
    ["title-empty", 'title={<>   </>} description="A coordinate plane."'],
    [
      "title-empty",
      'title={<InlineMath math="" />} description="A coordinate plane."',
    ],
    [
      "title-empty",
      'title={<InlineMath math={`\\x20`} />} description="A coordinate plane."',
    ],
    [
      "title-empty",
      'title={<InlineMath math />} description="A coordinate plane."',
    ],
    [
      "title-empty",
      'title={<InlineMath></InlineMath>} description="A coordinate plane."',
    ],
    [
      "title-empty",
      'title={<InlineMath>{/* nothing */}</InlineMath>} description="A coordinate plane."',
    ],
    [
      "title-dynamic",
      'title={<InlineMath math={0} />} description="A coordinate plane."',
    ],
    [
      "title-dynamic",
      'title={<InlineMath math={math} />} description="A coordinate plane."',
    ],
    [
      "title-dynamic",
      'title={<InlineMath math=<span>x</span> />} description="A coordinate plane."',
    ],
    [
      "title-dynamic",
      'title={<InlineMath>{0}</InlineMath>} description="A coordinate plane."',
    ],
    [
      "title-dynamic",
      'title={<InlineMath>{math}</InlineMath>} description="A coordinate plane."',
    ],
    [
      "title-dynamic",
      'title={<InlineMath><span>x</span></InlineMath>} description="A coordinate plane."',
    ],
    [
      "title-dynamic",
      'title={<InlineMath>x{"+"}</InlineMath>} description="A coordinate plane."',
    ],
    [
      "title-dynamic",
      'title={<InlineMath math="x">x</InlineMath>} description="A coordinate plane."',
    ],
    [
      "title-dynamic",
      'title={<InlineMath math="x" math="y" />} description="A coordinate plane."',
    ],
    [
      "title-dynamic",
      'title={<InlineMath {...math} />} description="A coordinate plane."',
    ],
    [
      "title-empty",
      'title={<InlineMath xlink:math="x" />} description="A coordinate plane."',
    ],
    [
      "title-dynamic",
      'title={<Math.Inline math="x" />} description="A coordinate plane."',
    ],
    [
      "title-dynamic",
      `title={\`Coordinate \${plane}\`} description="A coordinate plane."`,
    ],
    ["title-empty", 'title={<span></span>} description="A coordinate plane."'],
    ["title-empty", 'title={<span />} description="A coordinate plane."'],
    [
      "title-empty",
      'title={<span>{/* nothing */}</span>} description="A coordinate plane."',
    ],
    [
      "title-dynamic",
      'title={<span>{makeDescription()}</span>} description="A coordinate plane."',
    ],
    [
      "title-dynamic",
      'title={<Label>Coordinate plane</Label>} description="A coordinate plane."',
    ],
    ["description-empty", 'title="Coordinate plane" description'],
    ["description-empty", 'title="Coordinate plane" description=""'],
    ["description-empty", 'title="Coordinate plane" description={null}'],
    ["description-empty", 'title="Coordinate plane" description={<></>}'],
    [
      "description-empty",
      'title="Coordinate plane" description={<InlineMath />}',
    ],
    [
      "description-dynamic",
      'title="Coordinate plane" description={makeDescription()}',
    ],
  ] as const)("rejects %s visible metadata in %s", ([reason, attributes]) =>
    Effect.gen(function* () {
      const error = yield* rejectMathVisual(
        `<MathVisual ${attributes} scene={${planeScene()}} />`
      );
      assert.ok(
        error.violations.some((violation) => violation.reason === reason)
      );
    })
  );
});
