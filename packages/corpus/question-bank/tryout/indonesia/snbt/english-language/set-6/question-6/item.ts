import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The organisers of a community repair café evaluated a card listing the tools needed for each repair through a comparison and consultation with affected groups.",
        },
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of a community repair café without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every a community repair café.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines product-life extension without connecting it to a setting.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
