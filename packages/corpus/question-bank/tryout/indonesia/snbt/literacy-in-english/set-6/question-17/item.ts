import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Miles left one repaired seam visible instead of colouring it to match. The recurring object's physical appearance fixes its complete meaning from the first mention.",
        },
        {
          correct: false,
          label:
            "Miles left one repaired seam visible instead of colouring it to match. The ending states the object's meaning directly, making the earlier actions irrelevant.",
        },
        {
          correct: true,
          label:
            "Choosing the gold seam turns the repair from something to conceal into evidence of care, and the thin line of light confirms that change.",
        },
        {
          correct: false,
          label:
            "Miles left one repaired seam visible instead of colouring it to match. The setting alone changes the atmosphere, independently of the character's use of the recurring object.",
        },
        {
          correct: false,
          label:
            "Miles left one repaired seam visible instead of colouring it to match. The object keeps one fixed meaning even as the character's action and the final response change.",
        },
      ],
    },
  },
};

export default item;
