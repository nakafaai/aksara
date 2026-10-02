import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { inspectDocument } from "#nakafa-content/points/document";
import { findLiteralPoints } from "#nakafa-content/points/literal";

const METADATA = `export const metadata = {
  title: "Parabola",
  description: "Read the vertex and the opening of a parabola from its equation.",
  authors: [{ name: "Nakafa Tests" }],
  datePublished: "2026-01-01",
  dateModified: "2026-01-01",
  subject: "Quadratic Function",
};`;

/** Wraps teaching blocks in a lesson document that carries its metadata. */
export function lesson(...blocks: readonly string[]): string {
  return `${[
    METADATA,
    "## The graph of a parabola",
    'The graph of <InlineMath math="y=x^2" /> opens upward.',
    ...blocks,
  ].join("\n\n")}\n`;
}

/** Draws y = x^2 with the points computed from its formula. */
export const COMPUTED_CURVE = `<LineEquation
  title="Parabola"
  description="The curve y = x squared, sampled from its formula."
  data={[
    {
      points: Array.from({ length: 401 }, (_, i) => {
        const x = -2 + (i / 400) * 4;
        return { x, y: x ** 2, z: 0 };
      }),
      smooth: false,
      color: "#9333ea",
      showPoints: false,
    },
  ]}
/>`;

/** Draws y = x^2 from nine typed points, the shape a script prints. */
export const PASTED_CURVE = `<LineEquation
  title="Parabola"
  description="The curve y = x squared from nine typed points."
  data={[
    {
      points: [
        { x: -2, y: 4, z: 0 },
        { x: -1.5, y: 2.25, z: 0 },
        { x: -1, y: 1, z: 0 },
        { x: -0.5, y: 0.25, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0.5, y: 0.25, z: 0 },
        { x: 1, y: 1, z: 0 },
        { x: 1.5, y: 2.25, z: 0 },
        { x: 2, y: 4, z: 0 },
      ],
      smooth: false,
      color: "#9333ea",
      showPoints: false,
    },
  ]}
/>`;

/** Draws one outline whose five corners are named exactly. */
export const HOUSE_OUTLINE = `<MathVisual
  title="A house outline"
  description="A polygon with five exact corners."
  scene={{
    space: "plane",
    frame: { kind: "cartesian", x: { min: -1, max: 5 }, y: { min: -1, max: 6 } },
    view: { kind: "fit" },
    objects: [
      {
        id: "house",
        kind: "polygon",
        appearance: "primary",
        vertices: [
          { x: 0, y: 0 },
          { x: 4, y: 0 },
          { x: 4, y: 3 },
          { x: 2, y: 5 },
          { x: 0, y: 3 },
        ],
      },
    ],
    labels: [],
  }}
  labels={{}}
/>`;

/** Draws one LineEquation series whose points are the given source text. */
export function curveWith(points: string): string {
  return `<LineEquation
  title="Series"
  description="One series whose points come from the given source."
  data={[{ points: ${points}, smooth: false, showPoints: false }]}
/>`;
}

/** Writes the given number of typed object points, one after another. */
export function typedObjects(count: number): string {
  const points = Array.from(
    { length: count },
    (_, index) => `{ x: ${index}, y: ${index * 2}, z: 0 }`
  );
  return `[${points.join(", ")}]`;
}

/** Writes the given number of typed tuples with the given width. */
export function typedTuples(count: number, width: number): string {
  const points = Array.from(
    { length: count },
    (_, index) => `[${Array.from({ length: width }, () => index).join(", ")}]`
  );
  return `[${points.join(", ")}]`;
}

/** Parses one real MDX document and runs the literal rules over it. */
export function literalFindings(source: string) {
  return findLiteralPoints(source, inspectDocument(parseLessonMdx(source)));
}

/** Returns the rule id of every literal finding in a lesson of these blocks. */
export function literalRules(blocks: string) {
  return literalFindings(lesson(blocks)).map(({ rule }) => rule);
}
