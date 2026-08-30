import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage states that no action or observation occurred in an empty hall after a planning meeting.",
        },
        {
          isCorrect: false,
          label:
            "Everyone in an empty hall after a planning meeting obtained exactly the same result without variation.",
        },
        {
          isCorrect: true,
          label:
            "Iris erased the total and rewrote the budget as three questions.",
        },
        {
          isCorrect: false,
          label:
            "The writer removes every detail related to an empty hall after a planning meeting.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents open ending as proof that no follow-up is needed.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
