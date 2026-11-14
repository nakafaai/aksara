import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "information-validity",
  },
  stimulus: "class-cleaning",
  versions: {
    en: {
      columns: ["Supported", "Not supported"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "A duty team spends about twelve minutes on its tasks.",
        },
        { column: 2, label: "Every student cleans the classroom every day." },
        {
          column: 2,
          label: "The writer wants students to clean the toilets and gutters.",
        },
        {
          column: 1,
          label:
            "Hiring two extra cleaners would cost about 60 million rupiah a year.",
        },
      ],
    },
  },
};

export default item;
