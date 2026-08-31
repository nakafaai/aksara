import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Miles left one repaired seam visible instead of colouring it to match; the recurring object's physical appearance fixes its complete meaning from the first mention.",
        },
        {
          isCorrect: false,
          label:
            "Miles left one repaired seam visible instead of colouring it to match; the ending states the object's meaning directly, making the earlier actions irrelevant.",
        },
        {
          isCorrect: true,
          label:
            "Choosing the gold seam turns the repair from something to conceal into evidence of care, and the thin line of light confirms that change.",
        },
        {
          isCorrect: false,
          label:
            "Miles left one repaired seam visible instead of colouring it to match; the setting alone changes the atmosphere, independently of the character's use of the recurring object.",
        },
        {
          isCorrect: false,
          label:
            "Miles left one repaired seam visible instead of colouring it to match; the object keeps one fixed meaning even as the character's action and the final response change.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
