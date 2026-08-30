import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in a youth event-planning group.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in a youth event-planning group obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to a youth event-planning group.",
        },
        {
          isCorrect: true,
          label: "The comparison condition produced a mean value of 22.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents fixed cost as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
