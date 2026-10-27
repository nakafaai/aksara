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
            "The definition of *gravitropism* proves that the tested change caused the recorded result, even without the comparison conditions.",
        },
        {
          correct: true,
          label:
            "The definition of *gravitropism* clarifies the growth response being investigated, while the comparison and its limitations determine what the results support.",
        },
        {
          correct: false,
          label:
            "The definition makes *gravitropism* a substitute for the controls, so the unmeasured factor no longer limits the conclusion.",
        },
        {
          correct: false,
          label:
            "The definition broadens *gravitropism* from this short investigation to every similar system under any condition.",
        },
        {
          correct: false,
          label:
            "The term *gravitropism* names the report's limitation rather than the concept represented by the measurements.",
        },
      ],
    },
  },
};

export default item;
