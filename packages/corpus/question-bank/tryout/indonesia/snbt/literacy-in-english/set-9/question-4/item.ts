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
            "The definition of *selectivity* proves that the tested change caused the recorded result, even without the comparison conditions.",
        },
        {
          correct: false,
          label:
            "The definition makes *selectivity* a substitute for the controls, so the unmeasured factor no longer limits the conclusion.",
        },
        {
          correct: false,
          label:
            "The definition broadens *selectivity* from this short investigation to every similar system under any condition.",
        },
        {
          correct: false,
          label:
            "The term *selectivity* names the report's limitation rather than the concept represented by the measurements.",
        },
        {
          correct: true,
          label:
            "The definition distinguishes collecting the target fragments from simply trapping everything, while the single-material model leaves real-world selectivity untested.",
        },
      ],
    },
  },
};

export default item;
