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
            "Samira wrote the entry date on the last unmarked package. The recurring object's physical appearance fixes its complete meaning from the first mention.",
        },
        {
          correct: true,
          label:
            "Dating the final unmarked package changes the blue stamp into a cue for shared care, and the next volunteer's response shows that meaning being carried forward.",
        },
        {
          correct: false,
          label:
            "Samira wrote the entry date on the last unmarked package. The ending states the object's meaning directly, making the earlier actions irrelevant.",
        },
        {
          correct: false,
          label:
            "Samira wrote the entry date on the last unmarked package. The setting alone changes the atmosphere, independently of the character's use of the recurring object.",
        },
        {
          correct: false,
          label:
            "Samira wrote the entry date on the last unmarked package. The object keeps one fixed meaning even as the character's action and the final response change.",
        },
      ],
    },
  },
};

export default item;
