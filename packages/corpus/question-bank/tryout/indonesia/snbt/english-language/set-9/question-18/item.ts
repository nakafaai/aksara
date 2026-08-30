import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Every result in a night market after closing must apply without limitation elsewhere.",
        },
        {
          isCorrect: false,
          label:
            "The limitation makes all information about a night market after closing useless.",
        },
        {
          isCorrect: true,
          label:
            "a green permit card gains meaning through its connection to the conflict, choice, and ending.",
        },
        {
          isCorrect: false,
          label:
            "One detail about plot structure proves every possible causal relationship.",
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
