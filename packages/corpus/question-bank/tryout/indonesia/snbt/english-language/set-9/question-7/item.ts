import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in a night-market waste station.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in a night-market waste station obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to a night-market waste station.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents system alignment as proof that no follow-up is needed.",
        },
        {
          isCorrect: true,
          label: "The comparison condition produced a mean value of 37.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
