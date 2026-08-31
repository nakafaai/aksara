import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Use the same high-effort verification process for low-risk entertainment claims.",
        },
        {
          isCorrect: true,
          label:
            "Graphs, quotations, and product claims all require evidence questions.",
        },
        {
          isCorrect: false,
          label: "Screenshots are original sources by definition.",
        },
        {
          isCorrect: false,
          label:
            "Check each minor claim in full before continuing the assignment.",
        },
        {
          isCorrect: false,
          label:
            "Prefer a polished website when the original source is difficult to locate.",
        },
      ],
    },
  },
  stimulusKey: "source-checking",
};

export default item;
