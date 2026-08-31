import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The definition of *friction* proves that the tested change caused the recorded result, even without the comparison conditions.",
        },
        {
          isCorrect: false,
          label:
            "The definition makes *friction* a substitute for the controls, so the unmeasured factor no longer limits the conclusion.",
        },
        {
          isCorrect: false,
          label:
            "The definition broadens *friction* from this short investigation to every similar system under any condition.",
        },
        {
          isCorrect: true,
          label:
            "By defining *friction*, the report fixes the meaning of the scientific concept before the travel-time comparison and its limitation are interpreted.",
        },
        {
          isCorrect: false,
          label:
            "The term *friction* names the report's limitation rather than the concept represented by the measurements.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
