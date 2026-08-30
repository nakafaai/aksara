import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The visual description was deleted.",
        },
        {
          isCorrect: false,
          label: "Every remaining person was identified.",
        },
        {
          isCorrect: true,
          label: "Her statement was added as a contributor note.",
        },
        {
          isCorrect: false,
          label: "The photograph received no stable number.",
        },
        {
          isCorrect: false,
          label: "Mr. Vale closed the archive.",
        },
      ],
    },
  },
  stimulusKey: "archive-week",
};

export default item;
