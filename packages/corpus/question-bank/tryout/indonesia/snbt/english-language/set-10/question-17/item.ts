import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Recasting the recurring budget total as three questions changes it from a false conclusion into a shared inquiry, which the ending takes up.",
        },
        {
          isCorrect: false,
          label:
            "Iris erased the total and rewrote the budget as three questions; the recurring object's physical appearance fixes its complete meaning from the first mention.",
        },
        {
          isCorrect: false,
          label:
            "Iris erased the total and rewrote the budget as three questions; the ending states the object's meaning directly, making the earlier actions irrelevant.",
        },
        {
          isCorrect: false,
          label:
            "Iris erased the total and rewrote the budget as three questions; the setting alone changes the atmosphere, independently of the character's use of the recurring object.",
        },
        {
          isCorrect: false,
          label:
            "Iris erased the total and rewrote the budget as three questions; the object keeps one fixed meaning even as the character's action and the final response change.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
