import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in a neighbourhood flood drill.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in a neighbourhood flood drill obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to a neighbourhood flood drill.",
        },
        {
          isCorrect: true,
          label:
            "Asha read the alert aloud once, then removed every word that did not change the next action.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents narrative conflict as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
