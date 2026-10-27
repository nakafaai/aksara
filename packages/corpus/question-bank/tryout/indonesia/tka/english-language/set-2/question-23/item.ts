import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  stimulus: "source-checking",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Use the same high-effort verification process for low-risk entertainment claims.",
        },
        {
          correct: true,
          label:
            "Graphs, quotations, and product claims all require evidence questions.",
        },
        {
          correct: false,
          label: "Screenshots are original sources by definition.",
        },
        {
          correct: false,
          label:
            "Check each minor claim in full before continuing the assignment.",
        },
        {
          correct: false,
          label:
            "Prefer a polished website when the original source is difficult to locate.",
        },
      ],
    },
  },
};

export default item;
