import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "The mean result with the change was 71.",
        },
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in a model filter for floating plastic fragments.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in a model filter for floating plastic fragments obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to a model filter for floating plastic fragments.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents selectivity as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
