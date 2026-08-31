import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The definition of *potential difference* proves that the tested change caused the recorded result, even without the comparison conditions.",
        },
        {
          isCorrect: false,
          label:
            "The definition makes *potential difference* a substitute for the controls, so the unmeasured factor no longer limits the conclusion.",
        },
        {
          isCorrect: false,
          label:
            "The definition broadens *potential difference* from this short investigation to every similar system under any condition.",
        },
        {
          isCorrect: false,
          label:
            "The term *potential difference* names the report's limitation rather than the concept represented by the measurements.",
        },
        {
          isCorrect: true,
          label:
            "By defining *potential difference*, the report fixes the meaning of the measured concept before the numerical comparison and its limitation are interpreted.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
