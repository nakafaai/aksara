import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tracing the recurring bag backward turns a visible mistake into a route of causes, and the ending response shows why that reversal matters.",
        },
        {
          isCorrect: false,
          label:
            "Ravi followed the wrong-coloured bag backward through the crowded stalls; the recurring object's physical appearance fixes its complete meaning from the first mention.",
        },
        {
          isCorrect: false,
          label:
            "Ravi followed the wrong-coloured bag backward through the crowded stalls; the ending states the object's meaning directly, making the earlier actions irrelevant.",
        },
        {
          isCorrect: false,
          label:
            "Ravi followed the wrong-coloured bag backward through the crowded stalls; the setting alone changes the atmosphere, independently of the character's use of the recurring object.",
        },
        {
          isCorrect: false,
          label:
            "Ravi followed the wrong-coloured bag backward through the crowded stalls; the object keeps one fixed meaning even as the character's action and the final response change.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
