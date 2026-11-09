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
            "The definition of *enzyme* proves that the tested change caused the recorded result, even without the comparison conditions.",
        },
        {
          correct: true,
          label:
            "The definition identifies the biological process represented by the colour-change measure without turning that indirect measure into proof of concentration.",
        },
        {
          correct: false,
          label:
            "The definition makes *enzyme* a substitute for the controls, so the unmeasured factor no longer limits the conclusion.",
        },
        {
          correct: false,
          label:
            "The definition broadens *enzyme* from this short investigation to every similar system under any condition.",
        },
        {
          correct: false,
          label:
            "The term *enzyme* names the report's limitation rather than the concept represented by the measurements.",
        },
      ],
    },
  },
};

export default item;
