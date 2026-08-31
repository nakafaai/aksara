import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The definition of *truss* proves that the tested change caused the recorded result, even without the comparison conditions.",
        },
        {
          isCorrect: false,
          label:
            "The definition makes *truss* a substitute for the controls, so the unmeasured factor no longer limits the conclusion.",
        },
        {
          isCorrect: false,
          label:
            "The definition broadens *truss* from this short investigation to every similar system under any condition.",
        },
        {
          isCorrect: true,
          label:
            "The definition explains the structural idea being tested: connected triangles distribute forces, while the washer count measures how the paper model performs.",
        },
        {
          isCorrect: false,
          label:
            "The term *truss* names the report's limitation rather than the concept represented by the measurements.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
