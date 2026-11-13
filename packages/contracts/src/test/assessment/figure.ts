import { math, text } from "#contracts/test/assessment/document";

/** Builds a figure node of one component, as a document stores it. */
function figure<Props extends object>(
  component: string,
  alt: string,
  props: Props,
  caption: unknown = null
) {
  return { attrs: { alt, caption, component, props }, type: "figure" };
}

/** Props of the tank of SNBT general reasoning set 1, question 10: a space scene. */
export const tankProps = {
  description: [
    text(
      "The three perpendicular edges are each 4 dm. Multiplying length, width, and height gives 64 cubic dm, equal to 64 liters."
    ),
  ],
  labels: {
    height: [math("4\\text{ dm}")],
    length: [math("4\\text{ dm}")],
    width: [math("4\\text{ dm}")],
  },
  scene: {
    frame: {
      kind: "cartesian",
      x: { max: 4.5, min: -0.5 },
      y: { max: 4.5, min: -0.5 },
      z: { max: 4.5, min: -0.5 },
    },
    labels: [
      {
        at: { x: 2, y: 0, z: 4 },
        key: "length",
        objectId: "tank",
        placement: "below-left",
      },
      {
        at: { x: 4, y: 2, z: 4 },
        key: "height",
        objectId: "tank",
        placement: "right",
      },
      {
        at: { x: 4, y: 0, z: 2 },
        key: "width",
        objectId: "tank",
        placement: "below-right",
      },
    ],
    objects: [
      {
        appearance: "primary",
        center: { x: 2, y: 2, z: 2 },
        id: "tank",
        kind: "cuboid",
        size: { height: 4, length: 4, width: 4 },
      },
    ],
    space: "space",
    view: { kind: "isometric", target: { x: 2, y: 2, z: 2 } },
  },
  title: [text("The cubic tank before draining")],
};

/** The tank as a figure node. */
export const tankFigure = figure(
  "MathVisual",
  "A cubic tank whose three edges are each 4 dm long.",
  tankProps
);

/**
 * Props of a plane scene of the region that SNBT quantitative knowledge set 4,
 * question 15, asks about: y = |x - 2|, the line y = 4, the triangle between
 * them, and its three corners.
 */
export const regionProps = {
  description: [
    text("The V-shaped graph with vertex "),
    math("(2,0)"),
    text(" meets the line "),
    math("y=4"),
    text(" at "),
    math("(-2,4)"),
    text(" and "),
    math("(6,4)"),
    text(". The region between them is a triangle."),
  ],
  labels: {
    left: [math("(-2,4)")],
    right: [math("(6,4)")],
    vertex: [math("(2,0)")],
  },
  scene: {
    frame: {
      kind: "cartesian",
      x: { max: 7, min: -3 },
      y: { max: 5, min: -1 },
    },
    labels: [
      {
        at: { x: -2, y: 4 },
        key: "left",
        objectId: "left",
        placement: "above-left",
      },
      {
        at: { x: 2, y: 0 },
        key: "vertex",
        objectId: "vertex",
        placement: "below",
      },
      {
        at: { x: 6, y: 4 },
        key: "right",
        objectId: "right",
        placement: "above-right",
      },
    ],
    objects: [
      {
        appearance: "answer",
        id: "triangle",
        inequalities: ["y >= abs(x - 2)", "y <= 4"],
        kind: "region",
      },
      {
        appearance: "primary",
        domain: { max: 6.5, min: -2.5 },
        formula: "abs(x - 2)",
        id: "v",
        kind: "function",
      },
      {
        appearance: "secondary",
        id: "top",
        kind: "line",
        through: [
          { x: -2, y: 4 },
          { x: 6, y: 4 },
        ],
      },
      {
        appearance: "highlight",
        at: { x: -2, y: 4 },
        id: "left",
        kind: "point",
      },
      {
        appearance: "highlight",
        at: { x: 2, y: 0 },
        id: "vertex",
        kind: "point",
      },
      {
        appearance: "highlight",
        at: { x: 6, y: 4 },
        id: "right",
        kind: "point",
      },
    ],
    space: "plane",
    view: { kind: "fit" },
  },
  title: [
    text("Region between "),
    math("y=\\lvert x-2\\rvert"),
    text(" and "),
    math("y=4"),
  ],
};

/** The bounded region as a figure node, with a caption. */
export const regionFigure = figure(
  "MathVisual",
  "The graph of y equals the absolute value of x minus 2 and the line y equals 4 bound a triangle.",
  regionProps,
  [text("The bounded region")]
);

/** Props of the flow chart of SNBT general knowledge set 10, question 13. */
export const diagramProps = {
  chart:
    'flowchart TD\n  A["Gescannten Brief erfassen"] --> B["Texterkennung"]\n  B --> C["Namen, Orte und Themen vorschlagen"]\n  C --> D["Suchergebnisse"]',
  description:
    "Erkennungsfehler können Metadaten und Suchergebnisse erreichen.",
  title: "Von der Texterkennung zur Prüfung",
};

/** The flow chart as a figure node. */
export const diagramFigure = figure(
  "Mermaid",
  "A flow chart from scanned letters through text recognition to human review.",
  diagramProps
);
