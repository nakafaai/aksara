import { assert, it } from "@effect/vitest";

import { inspectLineEquationSeries } from "#nakafa-content/line/check";

it("proves only affine generated point series are exact straight lines", () => {
  const source = `<LineEquation
  data={[
    {
      points: Array.from({ length: 3 }, (_, index) => ({
        x: index,
        y: 2 * index + 1,
      })),
    },
    {
      points: Array.from({ length: 2 }, () => ({ x: 1, y: 1 })),
    },
    {
      points: Array.from({ length: 3 }, (_, index) => ({
        x: index,
        y: index * index,
      })),
    },
    {
      points: Array.from({ length: 3 }, (_, index) => ({
        x: index,
        y: Math.sin(index),
      })),
    },
    {
      points: Array.from({ length: 3 }, (_, index) => ({
        x: index / 2,
        y: -index,
      })),
    },
    {
      points: Array.from({ length: 3 }, (_, index) => ({
        x: index / index,
        y: index,
      })),
    },
    {
      points: Array.from({ length: 3 }, function (_, index) {
        const origin = { x: 0, y: 0 };
        const x = origin.x + index;
        return { x, y: +index, z: origin["y"] };
      }),
    },
    {
      points: Array.from({ length: 3 }, (_, index) => ({
        x: !index,
        y: index,
      })),
    },
    {
      points: Array.from({ length: 3 }, (_, index) => ({
        x: +1,
        y: index,
      })),
    },
    {
      points: Array.from({ length: 3 }, (_, index) => ({
        x: Math.exp(1000),
        y: index,
      })),
    },
    {
      points: Array.from({ length: 3 }, (_, index) => ({
        x: 1 / 0,
        y: index,
      })),
    },
    {
      points: Array.from({ length: 3 }, (_, index) => ({
        x: 4 % 2,
        y: index,
      })),
    },
    {
      points: Array.from({ length: 3 }, (_, index) => ({
        x: 4 % 0,
        y: index,
      })),
    },
    {
      points: Array.from({ length: 3 }, (_, index) => ({
        x: 2 ** 3,
        y: index,
      })),
    },
    {
      points: Array.from({ length: 3 }, (_, index) => ({
        x: 2 | 3,
        y: index,
      })),
    },
    {
      points: Array.from({ length: 2 }).map((_, index) => ({
        x: index,
        y: index,
      })),
    },
    { points: Array.from({ length: 2 }) },
    { points: Array.from({ length: -1 }, (_, index) => ({ x: index, y: index })) },
    { points: Array.from({ length: 2.5 }, (_, index) => ({ x: index, y: index })) },
    {
      points: Array.from({ length: 3 }, (_, index) => {
        if (index > 0) return { x: index, y: index };
        return { x: 0, y: 0 };
      }),
    },
    {
      points: Array.from({ length: 3 }, (_, index) => {
        const { value } = { value: index };
        return { x: value, y: index };
      }),
    },
  ]}
/>`;

  assert.deepEqual(
    inspectLineEquationSeries(source).map(({ exactSegment, pointCount }) => ({
      exactSegment,
      pointCount,
    })),
    [
      { exactSegment: true, pointCount: 3 },
      { exactSegment: false, pointCount: 2 },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: true, pointCount: 3 },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: true, pointCount: 3 },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: true, pointCount: 3 },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: true, pointCount: 3 },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: true, pointCount: 3 },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: true, pointCount: 2 },
      { exactSegment: false, pointCount: undefined },
      { exactSegment: false, pointCount: undefined },
      { exactSegment: false, pointCount: undefined },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: false, pointCount: 3 },
    ]
  );
});

it("rejects unrelated call and map shapes without executing them", () => {
  const source = `<LineEquation
  data={[
    { points: makePoints() },
    { points: Array.map((_, index) => ({ x: index, y: index })) },
    { points: Array.from({}).map((_, index) => ({ x: index, y: index })) },
    { points: Array.from({ length: 2 }).map() },
  ]}
/>`;

  assert.deepEqual(
    inspectLineEquationSeries(source).map(({ exactSegment, pointCount }) => ({
      exactSegment,
      pointCount,
    })),
    [
      { exactSegment: false, pointCount: undefined },
      { exactSegment: false, pointCount: undefined },
      { exactSegment: false, pointCount: undefined },
      { exactSegment: false, pointCount: undefined },
    ]
  );
});

it("classifies constant and unsupported coordinate expressions conservatively", () => {
  const source = `<LineEquation
  data={[
    {
      points: Array.from({ length: 3 }, (_, index) => ({
        x: index,
        y: missing + 1,
      })),
    },
    {
      points: Array.from({ length: 3 }, () => ({
        x: 3 + 4,
        y: 1 + 2,
      })),
    },
    {
      points: Array.from({ length: 3 }, (_, index) => ({
        x: index,
        y: missing * 2,
      })),
    },
    {
      points: Array.from({ length: 3 }, () => ({
        x: 2 * 3,
        y: 4,
      })),
    },
    {
      points: Array.from({ length: 3 }, (value, index) => ({
        x: value.x,
        y: index,
      })),
    },
    {
      points: Array.from({ length: 3 }, (_, index) => ({
        x: { value: index },
        y: index,
      })),
    },
    {
      points: Array.from({ length: 3 }, (_, index) => ({
        x: !1,
        y: index,
      })),
    },
    {
      points: Array.from({ length: 3 }, (_, index) => ({
        x: [index],
        y: index,
      })),
    },
    {
      points: Array.from({ length: 3 }, () => ({
        x: ({ value: 1 }) + 2,
        y: 4,
      })),
    },
    {
      points: Array.from({ length: 3 }, () => ({
        x: ({ value: 1 }) * 2,
        y: 4,
      })),
    },
    {
      points: Array.from({ length: 3 }, (_, index) => ({
        x: index.value,
        y: index,
      })),
    },
    {
      points: Array.from({ length: 3 }, (_, index) => ({ y: index })),
    },
    {
      points: Array.from({ length: 3 }, 1),
    },
    {
      points: Array.from({ length: 3 }, () => missing),
    },
    {
      points: Array.from(1, (_, index) => ({ x: index, y: index })),
    },
    { points: Array.from() },
  ]}
/>`;

  assert.deepEqual(
    inspectLineEquationSeries(source).map(({ exactSegment, pointCount }) => ({
      exactSegment,
      pointCount,
    })),
    [
      { exactSegment: false, pointCount: 3 },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: true, pointCount: 3 },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: true, pointCount: 3 },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: false, pointCount: 3 },
      { exactSegment: false, pointCount: undefined },
      { exactSegment: false, pointCount: undefined },
    ]
  );
});
