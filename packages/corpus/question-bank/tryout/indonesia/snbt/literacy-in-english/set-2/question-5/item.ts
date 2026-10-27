import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Every participant lost exactly $$1.24\\text{ kg}$$ and kept it off.",
        },
        {
          correct: false,
          label: "Only one of the $$35$$ studies reported any weight change.",
        },
        {
          correct: false,
          label: "Average weight increased during Ramadan and fell afterward.",
        },
        {
          correct: true,
          label:
            "Participants lost $$1.24\\text{ kg}$$ on average during Ramadan, but most of it was regained within weeks.",
        },
        {
          correct: false,
          label:
            "The review prescribed a fixed calorie target for all participants.",
        },
      ],
    },
  },
};

export default item;
