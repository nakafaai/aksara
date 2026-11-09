import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "recycling-rate",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Few buyers want them, since their materials are hard to separate.",
        },
        {
          correct: false,
          label: "Residents put mixed plastics in the wrong bins on purpose.",
        },
        {
          correct: false,
          label:
            "The sorting plant had no machines that could handle plastics.",
        },
        {
          correct: false,
          label:
            "Mixed plastics are always wet or covered in food when they are collected.",
        },
        {
          correct: false,
          label: "The newspaper did not count mixed plastics correctly.",
        },
      ],
    },
  },
};

export default item;
