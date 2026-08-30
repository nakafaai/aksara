import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of voltage in simple cell arrangements without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every voltage in simple cell arrangements.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines potential difference without connecting it to a setting.",
        },
        {
          isCorrect: true,
          label:
            "The class tested connecting two cells in series in voltage in simple cell arrangements while controlling other factors and reporting a limitation.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
