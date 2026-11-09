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
            "The definition of *truss* proves that the tested change caused the recorded result, even without the comparison conditions.",
        },
        {
          correct: false,
          label:
            "The definition makes *truss* a substitute for the controls, so the unmeasured factor no longer limits the conclusion.",
        },
        {
          correct: false,
          label:
            "The definition broadens *truss* from this short investigation to every similar system under any condition.",
        },
        {
          correct: true,
          label:
            "The definition explains the structural idea being tested: connected triangles distribute forces, while the washer count measures how the paper model performs.",
        },
        {
          correct: false,
          label:
            "The term *truss* names the report's limitation rather than the concept represented by the measurements.",
        },
      ],
    },
  },
};

export default item;
