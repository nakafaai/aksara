import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Testing mesh size in a filter for floating plastic",
        },
        {
          correct: false,
          label: "Measuring selectivity in one preliminary comparison",
        },
        {
          correct: false,
          label:
            "Treating selectivity as the sole explanation for the observed result",
        },
        {
          correct: false,
          label:
            "A final rule derived from the first comparison of selectivity",
        },
        {
          correct: false,
          label:
            "A limitation that makes another test of selectivity unnecessary",
        },
      ],
    },
  },
};

export default item;
