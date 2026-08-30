import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Every result in a model filter for floating plastic fragments must apply without limitation elsewhere.",
        },
        {
          isCorrect: true,
          label:
            "The initial pattern justifies a stronger repetition, not a universal claim.",
        },
        {
          isCorrect: false,
          label:
            "The limitation makes all information about a model filter for floating plastic fragments useless.",
        },
        {
          isCorrect: false,
          label:
            "One detail about selectivity proves every possible causal relationship.",
        },
        {
          isCorrect: false,
          label:
            "The passage recommends ignoring evidence that conflicts with an early expectation.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
