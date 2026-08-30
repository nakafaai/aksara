import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Absolute certainty about root growth in germinating beans",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in root growth in germinating beans should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of gravitropism",
        },
        {
          isCorrect: true,
          label:
            "Testing placing the seed opening toward the side of a clear container in root growth in germinating beans",
        },
        {
          isCorrect: false,
          label: "One rule for every root growth in germinating beans",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
