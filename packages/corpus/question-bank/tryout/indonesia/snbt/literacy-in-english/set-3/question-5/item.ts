import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "How seed orientation may influence early root growth",
        },
        {
          correct: false,
          label: "Measuring gravitropism in one preliminary comparison",
        },
        {
          correct: false,
          label:
            "Treating gravitropism as the sole explanation for the observed result",
        },
        {
          correct: false,
          label:
            "A final rule derived from the first comparison of gravitropism",
        },
        {
          correct: false,
          label:
            "A limitation that makes another test of gravitropism unnecessary",
        },
      ],
    },
  },
};

export default item;
