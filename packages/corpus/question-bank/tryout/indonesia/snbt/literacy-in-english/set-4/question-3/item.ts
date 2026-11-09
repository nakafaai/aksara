import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "deep-vents",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "The scientists aboard *Alvin* expected to find crowded communities of animals at the vents.",
        },
        {
          column: 1,
          label: "An adult giant tube worm has no mouth and no gut.",
        },
        {
          column: 1,
          label: "A single vent can stop flowing after only a few years.",
        },
        {
          column: 2,
          label:
            "Vent bacteria make their food from sunlight that filters down from the surface.",
        },
      ],
    },
  },
};

export default item;
