import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "cause-effect",
  },
  stimulus: "science-fair",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "They had never seen ice melt before." },
        {
          correct: false,
          label: "They expected the unwrapped cube to last the longest.",
        },
        {
          correct: false,
          label: "They believed the judges had made a mistake.",
        },
        {
          correct: false,
          label: "They thought newspaper was the best material.",
        },
        {
          correct: true,
          label:
            "They linked wool with warmth, so they expected it to make the ice melt faster.",
        },
      ],
    },
  },
};

export default item;
