import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "tambora-1816",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Tambora erupted in April 1816.",
        },
        {
          column: 1,
          label: "Snow fell in parts of New England in June 1816.",
        },
        {
          column: 2,
          label:
            "The sulphur droplets stayed for months because rain kept washing them higher.",
        },
        {
          column: 1,
          label:
            "Ice cores from Greenland and Antarctica contain volcanic sulphate from that time.",
        },
      ],
    },
  },
};

export default item;
