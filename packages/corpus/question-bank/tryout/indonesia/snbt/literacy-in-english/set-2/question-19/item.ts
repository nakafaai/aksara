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
            "argue that Bi Sheng, not the Korean monks, deserves the credit for printing *Jikji*.",
        },
        {
          correct: false,
          label:
            "explain how woodblocks were carved and inked in Korean temples.",
        },
        {
          correct: false,
          label:
            "prove that clay type produced clearer pages than metal type did.",
        },
        {
          correct: false,
          label:
            "describe the life and other writings of the scholar Shen Kuo.",
        },
        {
          correct: true,
          label:
            "trace movable type back before *Jikji* and explain why woodblocks still prevailed in China.",
        },
      ],
    },
  },
};

export default item;
