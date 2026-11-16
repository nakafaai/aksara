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

/** Props of the flow chart of SNBT general knowledge set 10, question 13. */
export const diagramProps = {
  chart:
    'flowchart TD\n  A["Gescannten Brief erfassen"] --> B["Texterkennung"]\n  B --> C["Namen, Orte und Themen vorschlagen"]\n  C --> D["Suchergebnisse"]',
  description: [
    text("Erkennungsfehler können Metadaten und Suchergebnisse erreichen."),
  ],
  title: [text("Von der Texterkennung zur Prüfung")],
};

/** The flow chart as a figure node. */
export const diagramFigure = figure(
  "Mermaid",
  "A flow chart from scanned letters through text recognition to human review.",
  diagramProps
);
