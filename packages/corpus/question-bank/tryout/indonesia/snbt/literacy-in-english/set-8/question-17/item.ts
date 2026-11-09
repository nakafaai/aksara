import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "ibn-battuta",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Ibn Battuta wrote the *Rihla* himself from detailed daily notes.",
        },
        {
          column: 2,
          label: "Samudra Pasai was on the southern coast of Java.",
        },
        {
          column: 1,
          label:
            "Ibn Battuta served as a judge in both Delhi and the Maldives.",
        },
        {
          column: 1,
          label: "Ibn Battuta was twenty-one when he set out for Mecca.",
        },
      ],
    },
  },
};

export default item;
