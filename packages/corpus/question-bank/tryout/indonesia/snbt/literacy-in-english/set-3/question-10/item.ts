import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "bag-charge",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Text B accepts the council's count of bags not handed out but disputes what that count measures.",
        },
        {
          correct: false,
          label:
            "Text B argues that the charge has not reduced the city's use of plastic at all.",
        },
        {
          correct: true,
          label:
            "Text A treats the weight of the bags not handed out as if it were the plastic no longer used.",
        },
        {
          correct: false,
          label: "Both writers want the charge to be extended to paper bags.",
        },
        {
          correct: true,
          label:
            "Text B's figure for bin liners comes from only part of the city's shops.",
        },
      ],
    },
  },
};

export default item;
