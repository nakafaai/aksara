import { assert, expect, it } from "@effect/vitest";

import {
  addExactLineSmoothing,
  findExactLineSmoothingIssues,
  inspectLineEquationSeries,
} from "#nakafa-content/line/check";

const INSERTED_SMOOTH = /\],\n {6}smooth: false,\n {6}color: "cyan"/u;
const CURVE_WITH_SMOOTH_FALSE = /Array\.from[\s\S]*smooth: false/iu;
const SMOOTH_FALSE = /smooth: false/gu;
const SMOOTH_TRUE = /smooth: true/u;

it("rejects two-point and collinear exact lines without disabled smoothing", () => {
  const source = `<LineEquation
  data={(() => {
    const tangentPoints = [
      { x: -1, y: -1, z: 0 },
      { x: 1, y: 1, z: 0 },
    ];
    return [
      { points: [{ x: 0, y: 0 }, { x: 2, y: 2 }] },
      { points: tangentPoints, smooth: true },
      {
        points: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      },
    ];
  })()}
/>`;

  assert.deepEqual(
    findExactLineSmoothingIssues(source).map(({ line, rule }) => ({
      line,
      rule,
    })),
    [
      { line: 8, rule: "exact-line-smoothing" },
      { line: 9, rule: "exact-line-smoothing" },
      { line: 11, rule: "exact-line-smoothing" },
    ]
  );
});

it("repairs exact series without rewriting curve data", () => {
  const source = `<LineEquation
  data={[
    {
      points: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ],
      color: "cyan",
    },
    {
      points: Array.from({ length: 10 }, (_, x) => ({ x, y: x ** 2 })),
      color: "purple",
    },
  ]}
/>`;

  const result = addExactLineSmoothing(source);

  assert.equal(result.changeCount, 1);
  assert.match(result.source, INSERTED_SMOOTH);
  expect(result.source).not.toMatch(CURVE_WITH_SMOOTH_FALSE);
  assert.deepEqual(findExactLineSmoothingIssues(result.source), []);
});

it("repairs generated, computed, and explicitly smoothed straight lines", () => {
  const source = `<LineEquation
  data={[
    {
      points: Array.from({ length: 11 }, (_, index) => {
        const x = index - 5;
        return { x, y: 2 * x + 1, z: 0 };
      }),
    },
    {
      points: Array.from({ length: 8 }).map((_, index) => ({
        x: index,
        y: index,
        z: 0,
      })),
    },
    {
      points: (() => {
        const focus = Math.sqrt(5);
        return [
          { x: -focus, y: 0, z: 0 },
          { x: focus, y: 0, z: 0 },
        ];
      })(),
    },
    {
      points: [
        { x: 0, y: 0, z: 0 },
        { x: Math.cos(Math.PI / 4), y: Math.sin(Math.PI / 4), z: 0 },
        { x: 2 * Math.cos(Math.PI / 4), y: 2 * Math.sin(Math.PI / 4), z: 0 },
      ],
      smooth: true,
    },
  ]}
/>`;

  assert.equal(findExactLineSmoothingIssues(source).length, 4);
  const result = addExactLineSmoothing(source);
  assert.equal(result.changeCount, 4);
  assert.equal(result.source.match(SMOOTH_FALSE)?.length, 4);
  expect(result.source).not.toMatch(SMOOTH_TRUE);
  assert.deepEqual(findExactLineSmoothingIssues(result.source), []);
});

it("preserves explicit straight lines and intentionally sampled curves", () => {
  const source = `<LineEquation
  data={[
    {
      points: [{ x: 0, y: 0 }, { x: 2, y: 2 }],
      smooth: false,
    },
    {
      points: Array.from({ length: 101 }, (_, index) => ({
        x: index / 10,
        y: (index / 10) ** 2,
      })),
      smooth: true,
    },
    {
      points: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 0 },
      ],
      smooth: true,
    },
    {
      points: [
        { x: 1, y: 1 },
        { x: 1, y: 1 },
      ],
    },
    {
      points: Array.from({ length: 2 }, () => ({ x: 1, y: 1 })),
    },
  ]}
/>`;

  assert.deepEqual(findExactLineSmoothingIssues(source), []);
  assert.deepEqual(
    inspectLineEquationSeries(source).map(
      ({ exactSegment, pointCount, pointsKind, smooth }) => ({
        exactSegment,
        pointCount,
        pointsKind,
        smooth,
      })
    ),
    [
      {
        exactSegment: true,
        pointCount: 2,
        pointsKind: "ArrayExpression",
        smooth: false,
      },
      {
        exactSegment: false,
        pointCount: 101,
        pointsKind: "CallExpression",
        smooth: true,
      },
      {
        exactSegment: false,
        pointCount: 3,
        pointsKind: "ArrayExpression",
        smooth: true,
      },
      {
        exactSegment: false,
        pointCount: 2,
        pointsKind: "ArrayExpression",
        smooth: undefined,
      },
      {
        exactSegment: false,
        pointCount: 2,
        pointsKind: "CallExpression",
        smooth: undefined,
      },
    ]
  );
});
