import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in enzyme activity in a classroom model.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in enzyme activity in a classroom model obtained exactly the same result without variation.",
        },
        {
          isCorrect: true,
          label: "The mean result with the change was 31.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to enzyme activity in a classroom model.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents enzyme as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
