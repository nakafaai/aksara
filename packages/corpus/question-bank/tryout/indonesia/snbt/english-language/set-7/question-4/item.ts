import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The definition of *confounding variable* proves that the tested change caused the recorded result, even without the comparison conditions.",
        },
        {
          isCorrect: false,
          label:
            "The definition makes *confounding variable* a substitute for the controls, so the unmeasured factor no longer limits the conclusion.",
        },
        {
          isCorrect: false,
          label:
            "The definition broadens *confounding variable* from this short investigation to every similar system under any condition.",
        },
        {
          isCorrect: false,
          label:
            "The term *confounding variable* names the report's limitation rather than the concept represented by the measurements.",
        },
        {
          isCorrect: true,
          label:
            "The definition explains why reduced light intensity weakens a colour-only interpretation: intensity changed together with the filter and could affect growth.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
