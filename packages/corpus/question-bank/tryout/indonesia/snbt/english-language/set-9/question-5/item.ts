import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Testing mesh size in a filter for floating plastic",
        },
        {
          isCorrect: false,
          label: "Measuring selectivity in one preliminary comparison",
        },
        {
          isCorrect: false,
          label:
            "Treating selectivity as the sole explanation for the observed result",
        },
        {
          isCorrect: false,
          label:
            "A final rule derived from the first comparison of selectivity",
        },
        {
          isCorrect: false,
          label:
            "A limitation that makes another test of selectivity unnecessary",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
