import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-3",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "From every detail to one clear action",
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
          label: "Cognitive load as a definition without a reviewable action",
        },
        {
          correct: false,
          label: "A complete plan without a small accountable step",
        },
      ],
    },
  },
};

export default item;
