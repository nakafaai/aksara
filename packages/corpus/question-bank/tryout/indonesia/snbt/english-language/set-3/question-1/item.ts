import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of root growth in germinating beans without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every root growth in germinating beans.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines gravitropism without connecting it to a setting.",
        },
        {
          isCorrect: true,
          label:
            "The class tested placing the seed opening toward the side of a clear container in root growth in germinating beans while controlling other factors and reporting a limitation.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
