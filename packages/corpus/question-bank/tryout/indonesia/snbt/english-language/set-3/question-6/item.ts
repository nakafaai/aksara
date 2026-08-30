import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of a neighbourhood bus information board without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every a neighbourhood bus information board.",
        },
        {
          isCorrect: true,
          label:
            "The organisers of a neighbourhood bus information board evaluated a map showing walking time from each bus stop through a comparison and consultation with affected groups.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines wayfinding without connecting it to a setting.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
