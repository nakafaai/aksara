import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "rosetta-stone",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "The Rosetta Stone was discovered by French soldiers.",
        },
        {
          column: 2,
          label:
            "The decree on the stone was written in four different scripts.",
        },
        {
          column: 1,
          label: "Coptic is described as a late form of the Egyptian language.",
        },
        {
          column: 2,
          label:
            "Hieroglyphs were deciphered within a few months of the stone's discovery.",
        },
      ],
    },
  },
};

export default item;
