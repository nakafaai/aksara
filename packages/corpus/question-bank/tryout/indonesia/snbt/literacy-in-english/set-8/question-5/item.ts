import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Measuring a truss in one preliminary comparison",
        },
        {
          correct: false,
          label:
            "Treating a truss as the sole explanation for the observed result",
        },
        {
          correct: true,
          label: "Testing a triangular truss in a paper bridge model",
        },
        {
          correct: false,
          label:
            "A final rule derived from the first comparison of truss designs",
        },
        {
          correct: false,
          label: "A limitation that makes another test of a truss unnecessary",
        },
      ],
    },
  },
};

export default item;
