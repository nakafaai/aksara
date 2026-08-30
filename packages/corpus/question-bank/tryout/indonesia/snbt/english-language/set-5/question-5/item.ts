import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Absolute certainty about friction on model ramps",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in friction on model ramps should be ignored",
        },
        {
          isCorrect: true,
          label:
            "Testing covering the ramp with coarse fabric in friction on model ramps",
        },
        {
          isCorrect: false,
          label: "The complete world history of friction",
        },
        {
          isCorrect: false,
          label: "One rule for every friction on model ramps",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
