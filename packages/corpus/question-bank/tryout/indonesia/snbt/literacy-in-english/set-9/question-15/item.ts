import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
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
          label: "Systems thinking as a definition without a reviewable action",
        },
        {
          correct: true,
          label: "Following one mistake back through the system",
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
