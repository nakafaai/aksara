import { Array as Arr } from "effect";

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

/** Props of the inequality of SNBT quantitative knowledge set 1, question 10. */
export const numberLineProps = {
  description: [
    text("Visualization of the solution to the inequality "),
    math("(x - 7)(x + 3) < 0"),
    text(" on a number line."),
  ],
  max: 9,
  min: -5,
  segments: [
    {
      end: -3,
      endInclusive: false,
      endLabel: [math("-3")],
      label: [math("+")],
      shaded: false,
      showPoints: true,
      start: "-infinity",
      startInclusive: false,
      startLabel: [math("-\\infty")],
    },
    {
      end: 7,
      endInclusive: false,
      endLabel: [math("7")],
      label: [math("-")],
      shaded: true,
      showPoints: true,
      start: -3,
      startInclusive: false,
      startLabel: [math("-3")],
    },
    {
      backgroundColor: "transparent",
      end: "infinity",
      endLabel: [math("+\\infty")],
      label: [math("+")],
      start: 7,
      startInclusive: false,
      startLabel: [math("7")],
    },
  ],
  title: [text("Number Line")],
};

/** The solution of the inequality as a figure node. */
export const numberLineFigure = figure(
  "NumberLine",
  "A number line where the numbers between -3 and 7 are shaded.",
  numberLineProps
);

/** Props of the triangle and its image of TKA compulsory mathematics set 1, question 15. */
export const lineProps = {
  cameraPosition: [0.5, 3, 9],
  cameraTarget: [0.5, 3, 0],
  data: [
    {
      color: "#9333ea",
      labels: [
        { at: 0, offset: [-0.2, -0.4, 0], text: [text("A")] },
        { at: 1, offset: [0.2, -0.4, 0], text: [text("B")] },
        { at: 2, offset: [0.2, 0.4, 0], text: [text("C")] },
      ],
      points: [
        { x: 1, y: 0, z: 0 },
        { x: 3, y: 0, z: 0 },
        { x: 1, y: 1, z: 0 },
        { x: 1, y: 0, z: 0 },
      ],
      smooth: false,
    },
    {
      color: "#d97706",
      labels: [
        { at: 0, offset: [0.4, -0.3, 0], text: [math("A^{\\prime}")] },
        { at: 1, offset: [0.4, 0.2, 0], text: [math("B^{\\prime}")] },
      ],
      pointIndices: [0, 1, 2],
      points: [
        { x: 0, y: 2, z: 0 },
        { x: 0, y: 6, z: 0 },
        { x: -2, y: 2, z: 0 },
        { x: 0, y: 2, z: 0 },
      ],
      showPoints: true,
      smooth: false,
    },
  ],
  description: [
    text(
      "The purple triangle has base 2 and height 1. Its orange image has base 4 and height 2."
    ),
  ],
  showZAxis: false,
  title: [text("Orientation before and after the transformation")],
};

/** The triangle and its image as a figure node. */
export const lineFigure = figure(
  "LineEquation",
  "A triangle with base 2 and height 1, and its image with base 4 and height 2.",
  lineProps
);

/**
 * The series of TKA compulsory mathematics set 3, question 8, that marks the
 * two fixed points of the function, the roots of x^2 - 3x - 5 = 0 on the line
 * y = x. Its line width is zero, so it draws the two points and no line.
 */
export const fixedPointsLine = {
  color: "#d97706",
  lineWidth: 0,
  points: Arr.map([-1, 1], (sign) => {
    const x = (3 + sign * Math.sqrt(29)) / 2;
    return { x, y: x, z: 0 };
  }),
  showPoints: true,
  smooth: false,
};

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

/** Props of angle A of SNBT quantitative knowledge set 1, question 7. */
export const circleProps = {
  angle: 22.619_864_948_040_426,
  description: [
    text("Visualization of angle "),
    math("A"),
    text(" with "),
    math("\\sin A = \\frac{5}{13}"),
    text("."),
  ],
  title: [text("Angle "), math("A")],
  trigValues: { cos: "12/13", sin: "5/13", tan: "5/12" },
};

/** The unit circle as a figure node, with a caption. */
export const circleFigure = figure(
  "UnitCircle",
  "A unit circle with the angle A whose sine is 5 over 13.",
  circleProps,
  [text("Angle A")]
);
