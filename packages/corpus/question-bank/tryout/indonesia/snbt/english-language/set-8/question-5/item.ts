import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Measuring truss in one preliminary comparison",
        },
        {
          isCorrect: false,
          label:
            "Treating truss as the sole explanation for the observed result",
        },
        {
          isCorrect: true,
          label: "Testing a triangular truss in a paper bridge model",
        },
        {
          isCorrect: false,
          label: "A final rule derived from the first comparison of truss",
        },
        {
          isCorrect: false,
          label: "A limitation that makes another test of truss unnecessary",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
