import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Measuring enzyme concentration in one preliminary comparison",
        },
        {
          isCorrect: false,
          label:
            "Treating the enzyme as the sole explanation for the observed result",
        },
        {
          isCorrect: false,
          label: "A final rule derived from the first enzyme trial",
        },
        {
          isCorrect: true,
          label: "Testing temperature and enzyme activity in a classroom model",
        },
        {
          isCorrect: false,
          label: "A limitation that makes another enzyme trial unnecessary",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
