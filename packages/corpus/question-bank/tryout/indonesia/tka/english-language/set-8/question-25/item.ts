import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "summary",
  },
  stimulus: "class-cleaning",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The writer says the parents are wrong about everything.",
        },
        {
          correct: false,
          label: "The writer asks students to clean the whole school.",
        },
        {
          correct: false,
          label: "The writer reports how much the school's cleaners earn.",
        },
        {
          correct: true,
          label:
            "The writer agrees that professional cleaners are still needed but limits student duty to the classroom.",
        },
        {
          correct: false,
          label: "The writer suggests closing the school hall.",
        },
      ],
    },
  },
};

export default item;
