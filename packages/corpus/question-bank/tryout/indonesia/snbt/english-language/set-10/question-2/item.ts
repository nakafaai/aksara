import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "The mean result with the change was 2.9.",
        },
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in voltage in simple cell arrangements.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in voltage in simple cell arrangements obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to voltage in simple cell arrangements.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents potential difference as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
