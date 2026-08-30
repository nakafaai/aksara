import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The class tested adding a removable mesh with smaller openings in a model filter for floating plastic fragments while controlling other factors and reporting a limitation.",
        },
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of a model filter for floating plastic fragments without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every a model filter for floating plastic fragments.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines selectivity without connecting it to a setting.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
