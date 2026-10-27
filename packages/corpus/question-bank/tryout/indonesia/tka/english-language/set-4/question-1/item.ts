import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "main-idea-purpose",
  },
  stimulus: "egret-hide",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "To persuade readers to visit the reserve when large flocks arrive",
        },
        {
          correct: false,
          label:
            "To explain why herons prefer to hunt in the reeds near the hide",
        },
        {
          correct: true,
          label:
            "To describe how a bird hide lets visitors watch birds without disturbing them",
        },
        {
          correct: false,
          label:
            "To report what a group of visitors saw during one morning at the hide",
        },
        {
          correct: false,
          label: "To teach readers how to build a hide beside a shallow lagoon",
        },
      ],
    },
  },
};

export default item;
