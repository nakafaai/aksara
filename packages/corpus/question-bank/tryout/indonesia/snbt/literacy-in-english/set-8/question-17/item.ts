import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Mei wrote both versions of the greeting on opposite sides of the same card. The recurring object's physical appearance fixes its complete meaning from the first mention.",
        },
        {
          correct: false,
          label:
            "Mei wrote both versions of the greeting on opposite sides of the same card. The ending states the object's meaning directly, making the earlier actions irrelevant.",
        },
        {
          correct: false,
          label:
            "Mei wrote both versions of the greeting on opposite sides of the same card. The setting alone changes the atmosphere, independently of the character's use of the recurring object.",
        },
        {
          correct: false,
          label:
            "Mei wrote both versions of the greeting on opposite sides of the same card. The object keeps one fixed meaning even as the character's action and the final response change.",
        },
        {
          correct: true,
          label:
            "Putting both greetings on the card preserves their different contexts, and turning the card for each visitor shows that suitability depends on relationship rather than one version being wrong.",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
