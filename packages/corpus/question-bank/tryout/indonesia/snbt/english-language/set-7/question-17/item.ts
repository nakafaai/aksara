import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Asha read the alert aloud once, then removed every word that did not change the next action; the recurring object's physical appearance fixes its complete meaning from the first mention.",
        },
        {
          isCorrect: false,
          label:
            "Asha read the alert aloud once, then removed every word that did not change the next action; the ending states the object's meaning directly, making the earlier actions irrelevant.",
        },
        {
          isCorrect: false,
          label:
            "Asha read the alert aloud once, then removed every word that did not change the next action; the setting alone changes the atmosphere, independently of the character's use of the recurring object.",
        },
        {
          isCorrect: true,
          label:
            "Reading and cutting the recurring alert shifts it from formal wording to actionable guidance, and the final listener response tests that change.",
        },
        {
          isCorrect: false,
          label:
            "Asha read the alert aloud once, then removed every word that did not change the next action; the object keeps one fixed meaning even as the character's action and the final response change.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
