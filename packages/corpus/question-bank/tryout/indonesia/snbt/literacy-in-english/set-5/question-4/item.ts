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
            "The definition of *friction* proves that the tested change caused the recorded result, even without the comparison conditions.",
        },
        {
          correct: false,
          label:
            "The definition makes *friction* a substitute for the controls, so the unmeasured factor no longer limits the conclusion.",
        },
        {
          correct: false,
          label:
            "The definition broadens *friction* from this short investigation to every similar system under any condition.",
        },
        {
          correct: true,
          label:
            "The definition of *friction* clarifies the force being investigated, while the travel-time comparison and possible surface wear determine what the results support.",
        },
        {
          correct: false,
          label:
            "The term *friction* names the report's limitation rather than the concept represented by the measurements.",
        },
      ],
    },
  },
};

export default item;
