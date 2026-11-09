import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "zoo-purpose",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "The Arabian oryx was bred in captivity and returned to its homeland.",
        },
        {
          column: 1,
          label: "Elephants in captivity may repeatedly pace the same route.",
        },
        {
          column: 2,
          label: "Most animals in most zoos belong to endangered species.",
        },
        {
          column: 2,
          label:
            "Large, well-designed enclosures fully meet the needs of polar bears.",
        },
      ],
    },
  },
};

export default item;
