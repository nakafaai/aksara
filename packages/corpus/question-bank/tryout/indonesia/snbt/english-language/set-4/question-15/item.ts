import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Absolute certainty about a community sports centre",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in a community sports centre should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of co-design",
        },
        {
          isCorrect: true,
          label: "Omar's next step in a community sports centre",
        },
        {
          isCorrect: false,
          label: "One rule for every a community sports centre",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
