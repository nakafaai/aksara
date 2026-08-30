import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Mei wrote both versions of the greeting on opposite sides of the same card.",
        },
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in a multilingual welcome desk.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in a multilingual welcome desk obtained exactly the same result without variation.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to a multilingual welcome desk.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents metaphor as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
