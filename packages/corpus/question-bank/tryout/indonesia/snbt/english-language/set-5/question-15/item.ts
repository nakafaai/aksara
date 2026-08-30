import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Absolute certainty about an after-school laboratory",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in an after-school laboratory should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of psychological safety",
        },
        {
          isCorrect: false,
          label: "One rule for every an after-school laboratory",
        },
        {
          isCorrect: true,
          label: "Mina's next step in an after-school laboratory",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
