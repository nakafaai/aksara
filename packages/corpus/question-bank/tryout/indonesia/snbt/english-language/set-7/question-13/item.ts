import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Every result in a residents' workshop must apply without limitation elsewhere.",
        },
        {
          isCorrect: false,
          label:
            "The limitation makes all information about a residents' workshop useless.",
        },
        {
          isCorrect: false,
          label:
            "One detail about cognitive load proves every possible causal relationship.",
        },
        {
          isCorrect: false,
          label:
            "The passage recommends ignoring evidence that conflicts with an early expectation.",
        },
        {
          isCorrect: true,
          label:
            "Priya's progress began when the difficulty was turned into a specific, reviewable action.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
