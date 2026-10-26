import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Making disagreement safe to discuss",
        },
        {
          correct: false,
          label: "Waiting for someone else to complete the next step",
        },
        {
          correct: false,
          label: "Hiding unresolved evidence in a larger project",
        },
        {
          correct: false,
          label:
            "Psychological safety as a definition without a reviewable action",
        },
        {
          correct: false,
          label: "A complete plan without a small accountable step",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
