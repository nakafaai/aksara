import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of friction on model ramps without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every friction on model ramps.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines friction without connecting it to a setting.",
        },
        {
          isCorrect: true,
          label:
            "The class tested covering the ramp with coarse fabric in friction on model ramps while controlling other factors and reporting a limitation.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
