import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Mina asked each member to state one concern before choosing the next step.",
        },
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in an after-school laboratory.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in an after-school laboratory obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to an after-school laboratory.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents psychological safety as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
