import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in a night market.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in a night market obtained exactly the same result without variation.",
        },
        {
          isCorrect: true,
          label:
            "Hana followed one bag from a stall to collection instead of judging the whole market at a glance.",
        },
        {
          isCorrect: false,
          label: "The writer removes every detail related to a night market.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents systems thinking as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
