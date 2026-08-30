import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Every result in a repair café during a storm must apply without limitation elsewhere.",
        },
        {
          isCorrect: false,
          label:
            "The limitation makes all information about a repair café during a storm useless.",
        },
        {
          isCorrect: false,
          label:
            "One detail about sensory imagery proves every possible causal relationship.",
        },
        {
          isCorrect: false,
          label:
            "The passage recommends ignoring evidence that conflicts with an early expectation.",
        },
        {
          isCorrect: true,
          label:
            "a spool of gold thread gains meaning through its connection to the conflict, choice, and ending.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
