import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Eli placed one plain sentence beside the longest museum label; the recurring object's physical appearance fixes its complete meaning from the first mention.",
        },
        {
          isCorrect: true,
          label:
            "Placing a plain sentence beside the recurring long label makes the contrast between display and access visible, and the ending response confirms its effect.",
        },
        {
          isCorrect: false,
          label:
            "Eli placed one plain sentence beside the longest museum label; the ending states the object's meaning directly, making the earlier actions irrelevant.",
        },
        {
          isCorrect: false,
          label:
            "Eli placed one plain sentence beside the longest museum label; the setting alone changes the atmosphere, independently of the character's use of the recurring object.",
        },
        {
          isCorrect: false,
          label:
            "Eli placed one plain sentence beside the longest museum label; the object keeps one fixed meaning even as the character's action and the final response change.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
