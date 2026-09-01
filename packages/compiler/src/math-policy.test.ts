import { assert, describe, it } from "@effect/vitest";
import { compile } from "@mdx-js/mdx";
import { Effect } from "effect";
import {
  createMathVisualPolicy,
  normalizeSchemaPath,
} from "#compiler/math-policy";
import {
  planeScene,
  rejectMathVisual,
  TEST_MATH_CONTENT_KEY,
  validateMathSource,
  validateMathVisual,
} from "#compiler/test/math";

describe("createMathVisualPolicy", () => {
  /** Resolves one authored token to the one-based location diagnostics expose. */
  function sourceLocation(source: string, token: string, fromIndex = 0) {
    const offset = source.indexOf(token, fromIndex);
    assert.notStrictEqual(offset, -1);
    const prefix = source.slice(0, offset);
    const lineStart = prefix.lastIndexOf("\n") + 1;
    return {
      column: offset - lineStart + 1,
      line: prefix.split("\n").length,
    };
  }

  it("normalizes every Standard Schema path representation", () => {
    assert.deepStrictEqual(normalizeSchemaPath(undefined), []);
    assert.deepStrictEqual(
      normalizeSchemaPath([{ key: "frame" }, Symbol.for("renderer"), 0]),
      ["frame", "Symbol(renderer)", 0]
    );
  });

  it.effect("accepts a described flow scene with no rich labels", () =>
    validateMathVisual(
      `<MathVisual
        title="Coordinate plane"
        description="One diagonal line."
        scene={${planeScene().replace(/\s+/gu, " ")}}
      />`
    )
  );

  it.effect("rejects inline placement of the block renderer", () =>
    Effect.gen(function* () {
      const error = yield* rejectMathVisual(
        `Inline <MathVisual scene={${planeScene().replace(/\s+/gu, " ")}} /> visual.`
      );
      assert.deepStrictEqual(error.violations, [
        { column: 8, line: 1, reason: "placement-inline" },
      ]);
    })
  );

  it.effect("preserves a typed root schema path and authored location", () =>
    Effect.gen(function* () {
      const error = yield* rejectMathVisual(
        '<MathVisual scene={{ space: "plane", objects: [] }} title="Plane" description="A mathematical plane." />'
      );
      assert.deepStrictEqual(error.violations, [
        {
          column: 20,
          line: 1,
          message: "Missing key",
          path: ["frame"],
          reason: "scene-schema",
        },
      ]);
    })
  );

  it.effect("preserves nested schema paths and authored locations", () =>
    Effect.gen(function* () {
      const error = yield* rejectMathVisual(`<MathVisual scene={{
        space: "plane",
        frame: {
          kind: "cartesian",
          axes: "visible",
          grid: "visible",
          x: { min: -2, max: 2 },
          y: { min: -2, max: 2 },
        },
        view: { kind: "fit", padding: 0.25 },
        objects: [{
          id: "diagonal",
          kind: "segment",
          appearance: "primary",
          from: { x: "wrong", y: -1 },
          to: { x: 1, y: 1 },
        }],
      }} title="Plane" description="A mathematical plane." />`);
      assert.deepStrictEqual(error.violations, [
        {
          column: 19,
          line: 15,
          message: "Expected number",
          path: ["objects", 0, "from", "x"],
          reason: "scene-schema",
        },
      ]);
    })
  );

  it.effect("points a duplicate object id at its repeated authored key", () =>
    Effect.gen(function* () {
      const rawMdx = `<MathVisual scene={{
        space: "plane",
        frame: {
          kind: "cartesian",
          axes: "visible",
          grid: "visible",
          x: { min: -2, max: 2 },
          y: { min: -2, max: 2 },
        },
        view: { kind: "fit" },
        objects: [
          {
            id: "same-point",
            kind: "point",
            appearance: "primary",
            at: { x: 0, y: 0 },
          },
          {
            id: "same-point",
            kind: "point",
            appearance: "secondary",
            at: { x: 1, y: 1 },
          },
        ],
      }} title="Plane" description="A mathematical plane." />`;
      const first = rawMdx.indexOf('id: "same-point"');
      const expectedLocation = sourceLocation(
        rawMdx,
        'id: "same-point"',
        first + 1
      );
      const error = yield* rejectMathVisual(rawMdx);
      assert.deepStrictEqual(error.violations, [
        {
          ...expectedLocation,
          message: "Expected a unique mathematical object id.",
          path: ["objects", 1, "id"],
          reason: "scene-schema",
        },
      ]);
    })
  );

  it.effect("points a duplicate label key at its repeated authored key", () =>
    Effect.gen(function* () {
      const rawMdx = `<MathVisual
        scene={{
          space: "plane",
          frame: {
            kind: "cartesian",
            axes: "visible",
            grid: "visible",
            x: { min: -2, max: 2 },
            y: { min: -2, max: 2 },
          },
          view: { kind: "fit" },
          objects: [{
            id: "origin-point",
            kind: "point",
            appearance: "primary",
            at: { x: 0, y: 0 },
          }],
          labels: [
            { key: "origin", at: { x: 0, y: 0 } },
            { key: "origin", at: { x: 1, y: 1 } },
          ],
        }}
        labels={{ origin: <>Origin</> }}
        title="Plane"
        description="A mathematical plane."
      />`;
      const first = rawMdx.indexOf('key: "origin"');
      const expectedLocation = sourceLocation(
        rawMdx,
        'key: "origin"',
        first + 1
      );
      const error = yield* rejectMathVisual(rawMdx);
      assert.deepStrictEqual(error.violations, [
        {
          ...expectedLocation,
          message: "Expected a unique mathematical label key.",
          path: ["labels", 1, "key"],
          reason: "scene-schema",
        },
      ]);
    })
  );

  it.effect.each([
    ["rendererOnly", '{ rendererOnly: true, space: "plane" }'],
    [
      "cameraFov",
      planeScene().replace(
        'view: { kind: "fit", padding: 0.25 }',
        'view: { kind: "fit", padding: 0.25, cameraFov: 45 }'
      ),
    ],
    [
      "smooth",
      planeScene().replace(
        'appearance: "primary",',
        'appearance: "primary", smooth: true,'
      ),
    ],
  ] as const)("rejects the unexpected nested %s scene field", ([name, scene]) =>
    Effect.gen(function* () {
      const error = yield* rejectMathVisual(`<MathVisual scene={${scene}} />`);
      const violation = error.violations.find(
        (candidate) => candidate.reason === "scene-schema"
      );
      assert.ok(violation);
      if (violation.reason === "scene-schema") {
        assert.strictEqual(violation.path.at(-1), name);
        assert.strictEqual(violation.message, "Expected no excess property");
      }
    })
  );

  it.effect("returns stable diagnostics across repeated validation", () =>
    Effect.gen(function* () {
      const policy = createMathVisualPolicy(TEST_MATH_CONTENT_KEY);
      yield* Effect.promise(() =>
        compile('<MathVisual scene={{ space: "plane" }} />', {
          remarkPlugins: [policy.remarkPlugin],
        })
      );
      const first = yield* Effect.flip(policy.validate());
      const second = yield* Effect.flip(policy.validate());
      assert.deepStrictEqual(first, second);
    })
  );

  it.effect("requires exact scene-anchor and rich-label key sets", () =>
    Effect.gen(function* () {
      const error = yield* rejectMathVisual(`<MathVisual
        scene={${planeScene(
          'labels: [{ key: "point-a", at: { x: 0, y: 0 } }],'
        )}}
        labels={{ "point-b": <>B</> }}
        title="Plane"
        description="A mathematical plane."
      />`);
      assert.strictEqual(error.violations[0]?.reason, "label-keys-mismatch");
    })
  );

  it.effect("rejects an omitted rich label for a declared scene anchor", () =>
    Effect.gen(function* () {
      const error = yield* rejectMathVisual(
        `<MathVisual scene={${planeScene(
          'labels: [{ key: "point-a", at: { x: 0, y: 0 } }],'
        )}} title="Plane" description="A mathematical plane." />`
      );
      assert.strictEqual(error.violations[0]?.reason, "label-keys-mismatch");
    })
  );

  it.effect(
    "surfaces MathVisual syntax before generic executable findings",
    () =>
      Effect.gen(function* () {
        const error = yield* Effect.flip(
          validateMathSource("<MathVisual scene={{ view: getView() }} />")
        );
        assert.strictEqual(error._tag, "MathVisualPolicyError");
        if (error._tag === "MathVisualPolicyError") {
          assert.strictEqual(
            error.violations[0]?.reason,
            "scene-dynamic-value"
          );
        }
      })
  );
});
