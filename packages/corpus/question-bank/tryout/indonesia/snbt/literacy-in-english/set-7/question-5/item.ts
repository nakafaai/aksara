import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Measuring a confounding variable in one preliminary comparison",
        },
        {
          correct: false,
          label:
            "Treating a confounding variable as the sole explanation for the observed result",
        },
        {
          correct: true,
          label: "Testing how filtered blue light affects leaf growth",
        },
        {
          correct: false,
          label:
            "A final rule derived from the first comparison of a confounding variable",
        },
        {
          correct: false,
          label:
            "A limitation that makes another test of a confounding variable unnecessary",
        },
      ],
    },
  },
};

export default item;
