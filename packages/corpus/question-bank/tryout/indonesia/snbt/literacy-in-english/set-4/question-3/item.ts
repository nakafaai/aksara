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
          column: 2,
          label: "Once a vent forms, it keeps flowing for many centuries.",
        },
        {
          column: 1,
          label:
            "Vent bacteria rely on oxygen that was produced at the ocean's surface.",
        },
      ],
    },
  },
};

export default item;
