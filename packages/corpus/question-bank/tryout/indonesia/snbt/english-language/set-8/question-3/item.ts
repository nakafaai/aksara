import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Every result in load distribution in paper bridge models must apply without limitation elsewhere.",
        },
        {
          isCorrect: false,
          label:
            "The limitation makes all information about load distribution in paper bridge models useless.",
        },
        {
          isCorrect: false,
          label:
            "One detail about truss proves every possible causal relationship.",
        },
        {
          isCorrect: false,
          label:
            "The passage recommends ignoring evidence that conflicts with an early expectation.",
        },
        {
          isCorrect: true,
          label:
            "The initial pattern justifies a stronger repetition, not a universal claim.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
