import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Measuring enzyme in one preliminary comparison",
        },
        {
          isCorrect: false,
          label:
            "Treating enzyme as the sole explanation for the observed result",
        },
        {
          isCorrect: false,
          label: "A final rule derived from the first comparison of enzyme",
        },
        {
          isCorrect: true,
          label: "Testing temperature and enzyme activity in a classroom model",
        },
        {
          isCorrect: false,
          label: "A limitation that makes another test of enzyme unnecessary",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
