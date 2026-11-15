import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "sweet-drinks",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Students drink too much sugar.",
        },
        {
          correct: false,
          label: "The charge caused the fall in drink sales at SMP Mutiara.",
        },
        {
          correct: true,
          label:
            "During the trial, SMP Mutiara's canteen sold $$540$$ sweetened drinks a week.",
        },
        {
          correct: false,
          label: "Visits to the nurse for headaches fell at SMP Mutiara.",
        },
        {
          correct: true,
          label: "Drinking-water fountains are worth installing.",
        },
      ],
    },
  },
};

export default item;
