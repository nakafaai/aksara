import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Every result in a youth translation club must apply without limitation elsewhere.",
        },
        {
          isCorrect: true,
          label:
            "Jonas's progress began when the difficulty was turned into a specific, reviewable action.",
        },
        {
          isCorrect: false,
          label:
            "The limitation makes all information about a youth translation club useless.",
        },
        {
          isCorrect: false,
          label:
            "One detail about connotation proves every possible causal relationship.",
        },
        {
          isCorrect: false,
          label:
            "The passage recommends ignoring evidence that conflicts with an early expectation.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
