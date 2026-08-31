import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Measuring confounding variable in one preliminary comparison",
        },
        {
          isCorrect: false,
          label:
            "Treating confounding variable as the sole explanation for the observed result",
        },
        {
          isCorrect: true,
          label: "Testing how filtered blue light affects leaf growth",
        },
        {
          isCorrect: false,
          label:
            "A final rule derived from the first comparison of confounding variable",
        },
        {
          isCorrect: false,
          label:
            "A limitation that makes another test of confounding variable unnecessary",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
