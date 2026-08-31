import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Progress depends on completing the larger task before asking another person to review it.",
        },
        {
          isCorrect: true,
          label:
            "Theo's progress began when the difficulty was turned into a specific, reviewable action.",
        },
        {
          isCorrect: false,
          label:
            "The object or setting shapes the outcome more strongly than the character's specific choice.",
        },
        {
          isCorrect: false,
          label:
            "The unresolved evidence should remain private until the character can offer a complete result.",
        },
        {
          isCorrect: false,
          label:
            "The small action matters mainly because it postpones the unresolved part of the conflict.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
