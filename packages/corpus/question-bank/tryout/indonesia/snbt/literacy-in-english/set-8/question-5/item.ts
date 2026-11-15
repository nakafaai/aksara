import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "phineas-gage",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A patient forgets new names in the first weeks after an operation, and a textbook describes this as permanent although the patient later returns to a demanding job.",
        },
        {
          correct: false,
          label:
            "A patient forgets new names for years after an operation, and a textbook describes this as permanent.",
        },
        {
          correct: false,
          label:
            "A patient forgets new names in the first weeks after an operation, and a textbook describes this as temporary because the patient later returns to work.",
        },
        {
          correct: false,
          label:
            "A patient forgets new names in the first weeks after an operation, and a textbook describes this as permanent, which later tests at the patient's new job confirm.",
        },
        {
          correct: false,
          label:
            "A patient forgets new names in the first weeks after an operation, and a doctor writes a short report about it at the time.",
        },
      ],
    },
  },
};

export default item;
