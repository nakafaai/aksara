import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "information-validity",
  },
  stimulus: "first-aid",
  versions: {
    en: {
      columns: ["Supported", "Not supported"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Thirty students took part in the trial course." },
        { column: 2, label: "The trial course lasted a full week." },
        {
          column: 2,
          label:
            "The writer wants students to move anyone who has fallen to a safer place.",
        },
        {
          column: 1,
          label: "The second quiz was taken right after the course.",
        },
      ],
    },
  },
};

export default item;
