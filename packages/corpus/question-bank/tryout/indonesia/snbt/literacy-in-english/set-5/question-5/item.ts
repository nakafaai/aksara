import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Measuring friction in one preliminary comparison",
        },
        {
          correct: false,
          label:
            "Treating friction as the sole explanation for the observed result",
        },
        {
          correct: false,
          label: "A final rule derived from the first comparison of friction",
        },
        {
          correct: false,
          label: "A limitation that makes another test of friction unnecessary",
        },
        {
          correct: true,
          label: "Testing how ramp texture affects travel time",
        },
      ],
    },
  },
};

export default item;
