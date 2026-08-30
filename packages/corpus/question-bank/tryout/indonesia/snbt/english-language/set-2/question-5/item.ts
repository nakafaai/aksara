import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Every participant lost exactly 1.24 kg and kept it off.",
        },
        {
          isCorrect: false,
          label: "Only one of the 35 studies reported any weight change.",
        },
        {
          isCorrect: true,
          label:
            "Participants lost 1.24 kg on average during Ramadan, but most of it was regained within weeks.",
        },
        {
          isCorrect: false,
          label: "Average weight increased during Ramadan and fell afterward.",
        },
        {
          isCorrect: false,
          label:
            "The review prescribed a fixed calorie target for all participants.",
        },
      ],
    },
  },
};

export default item;
