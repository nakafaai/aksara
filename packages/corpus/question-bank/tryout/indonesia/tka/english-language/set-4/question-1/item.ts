import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "main-idea-purpose",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "To persuade readers to visit the reserve when large flocks arrive",
        },
        {
          isCorrect: false,
          label:
            "To explain why herons prefer to hunt in the reeds near the hide",
        },
        {
          isCorrect: true,
          label:
            "To describe how a bird hide lets visitors watch birds without disturbing them",
        },
        {
          isCorrect: false,
          label:
            "To report what a group of visitors saw during one morning at the hide",
        },
        {
          isCorrect: false,
          label: "To teach readers how to build a hide beside a shallow lagoon",
        },
      ],
    },
  },
  stimulusKey: "egret-hide",
};

export default item;
