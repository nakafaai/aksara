import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "information-validity",
  },
  stimulus: "data-plan",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A Harian bought at 23:30 can be used for at most $$29$$ minutes.",
        },
        {
          correct: false,
          label: "Night data can be used at 6:30.",
        },
        {
          correct: true,
          label:
            "A Mingguan bought on a Friday is still valid on the following Thursday.",
        },
        {
          correct: false,
          label: "Leftover night data is added to a renewed package.",
        },
        {
          correct: false,
          label:
            "A Bulanan gives $$40$$ GB that can be used at any time of day.",
        },
      ],
    },
  },
};

export default item;
