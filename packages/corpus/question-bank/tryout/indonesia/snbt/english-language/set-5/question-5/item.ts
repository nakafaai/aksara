import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Measuring friction in one preliminary comparison",
        },
        {
          isCorrect: false,
          label:
            "Treating friction as the sole explanation for the observed result",
        },
        {
          isCorrect: false,
          label: "A final rule derived from the first comparison of friction",
        },
        {
          isCorrect: false,
          label: "A limitation that makes another test of friction unnecessary",
        },
        {
          isCorrect: true,
          label: "Testing how surface texture changes friction on a model ramp",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
