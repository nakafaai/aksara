import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Measuring enzyme concentration in one preliminary comparison",
        },
        {
          correct: false,
          label:
            "Treating the enzyme as the sole explanation for the observed result",
        },
        {
          correct: false,
          label: "A final rule derived from the first enzyme trial",
        },
        {
          correct: true,
          label: "Testing temperature and enzyme activity in a classroom model",
        },
        {
          correct: false,
          label: "A limitation that makes another enzyme trial unnecessary",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
