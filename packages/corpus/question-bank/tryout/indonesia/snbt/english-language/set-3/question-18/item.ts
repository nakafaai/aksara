import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Every result in a station before sunrise must apply without limitation elsewhere.",
        },
        {
          isCorrect: true,
          label:
            "a folded bus map gains meaning through its connection to the conflict, choice, and ending.",
        },
        {
          isCorrect: false,
          label:
            "The limitation makes all information about a station before sunrise useless.",
        },
        {
          isCorrect: false,
          label:
            "One detail about irony proves every possible causal relationship.",
        },
        {
          isCorrect: false,
          label:
            "The passage recommends ignoring evidence that conflicts with an early expectation.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
