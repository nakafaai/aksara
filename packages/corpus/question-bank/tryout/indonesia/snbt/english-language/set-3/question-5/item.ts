import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "How seed orientation may influence early root growth",
        },
        {
          isCorrect: false,
          label: "Measuring gravitropism in one preliminary comparison",
        },
        {
          isCorrect: false,
          label:
            "Treating gravitropism as the sole explanation for the observed result",
        },
        {
          isCorrect: false,
          label:
            "A final rule derived from the first comparison of gravitropism",
        },
        {
          isCorrect: false,
          label:
            "A limitation that makes another test of gravitropism unnecessary",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
