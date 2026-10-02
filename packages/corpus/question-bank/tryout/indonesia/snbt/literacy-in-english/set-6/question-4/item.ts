import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The definition of *enzyme* proves that the tested change caused the recorded result, even without the comparison conditions.",
        },
        {
          isCorrect: true,
          label:
            "The definition identifies the biological process represented by the colour-change measure without turning that indirect measure into proof of concentration.",
        },
        {
          isCorrect: false,
          label:
            "The definition makes *enzyme* a substitute for the controls, so the unmeasured factor no longer limits the conclusion.",
        },
        {
          isCorrect: false,
          label:
            "The definition broadens *enzyme* from this short investigation to every similar system under any condition.",
        },
        {
          isCorrect: false,
          label:
            "The term *enzyme* names the report's limitation rather than the concept represented by the measurements.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
