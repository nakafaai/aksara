import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The definition of *confounding variable* proves that the tested change caused the recorded result, even without the comparison conditions.",
        },
        {
          correct: false,
          label:
            "The definition makes *confounding variable* a substitute for the controls, so the unmeasured factor no longer limits the conclusion.",
        },
        {
          correct: false,
          label:
            "The definition broadens *confounding variable* from this short investigation to every similar system under any condition.",
        },
        {
          correct: false,
          label:
            "The term *confounding variable* names the measured leaf area and shows that colour was successfully isolated from intensity.",
        },
        {
          correct: true,
          label:
            "The definition explains why reduced light intensity weakens a colour-only interpretation: intensity changed together with the filter and could affect growth.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
