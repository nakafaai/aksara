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
            "Eli placed one plain sentence beside the longest museum label. The recurring object's physical appearance fixes its complete meaning from the first mention.",
        },
        {
          correct: true,
          label:
            "Writing a direct observation prompt on the recurring blank card changes it into an accessible entry point, and the visitors' response confirms that effect.",
        },
        {
          correct: false,
          label:
            "Eli placed one plain sentence beside the longest museum label. The ending states the object's meaning directly, making the earlier actions irrelevant.",
        },
        {
          correct: false,
          label:
            "Eli placed one plain sentence beside the longest museum label. The setting alone changes the atmosphere, independently of the character's use of the recurring object.",
        },
        {
          correct: false,
          label:
            "Eli placed one plain sentence beside the longest museum label. The object keeps one fixed meaning even as the character's action and the final response change.",
        },
      ],
    },
  },
};

export default item;
