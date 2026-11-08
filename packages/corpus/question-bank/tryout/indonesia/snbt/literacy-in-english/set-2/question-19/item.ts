import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "structure",
  },
  stimulus: "jikji-printing",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "argue that Bi Sheng, not the Korean monks, deserves credit for *Jikji*.",
        },
        {
          correct: false,
          label: "explain how woodblocks were carved in Korea.",
        },
        {
          correct: false,
          label: "prove that clay type produced clearer pages than metal type.",
        },
        {
          correct: false,
          label: "describe the life of the scholar Shen Kuo.",
        },
        {
          correct: true,
          label:
            "show that the idea of movable type is older than both *Jikji* and Gutenberg, while noting why it did not replace woodblock printing in China.",
        },
      ],
    },
  },
};

export default item;
