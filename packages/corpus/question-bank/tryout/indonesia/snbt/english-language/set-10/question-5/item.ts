import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Absolute certainty about voltage in simple cell arrangements",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in voltage in simple cell arrangements should be ignored",
        },
        {
          isCorrect: true,
          label:
            "Testing connecting two cells in series in voltage in simple cell arrangements",
        },
        {
          isCorrect: false,
          label: "The complete world history of potential difference",
        },
        {
          isCorrect: false,
          label: "One rule for every voltage in simple cell arrangements",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
