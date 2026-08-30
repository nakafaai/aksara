import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The class tested using a blue light filter in leaf growth under different light colours while controlling other factors and reporting a limitation.",
        },
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of leaf growth under different light colours without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every leaf growth under different light colours.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines confounding variable without connecting it to a setting.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
