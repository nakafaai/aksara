import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Theo's progress began when the difficulty was turned into a specific, reviewable action.",
        },
        {
          isCorrect: false,
          label:
            "Every result in a small public archive must apply without limitation elsewhere.",
        },
        {
          isCorrect: false,
          label:
            "The limitation makes all information about a small public archive useless.",
        },
        {
          isCorrect: false,
          label:
            "One detail about metadata proves every possible causal relationship.",
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
