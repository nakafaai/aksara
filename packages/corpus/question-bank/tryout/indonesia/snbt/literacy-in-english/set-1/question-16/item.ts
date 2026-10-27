import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "To prove that yoga cures every chronic illness.",
        },
        {
          correct: false,
          label: "To persuade readers to replace medical care with yoga.",
        },
        {
          correct: false,
          label:
            "To compare the religious traditions behind different yoga styles.",
        },
        {
          correct: true,
          label:
            "To explain yoga's possible physical and mental benefits, evidence limits, and safe practice.",
        },
        {
          correct: false,
          label: "To teach a complete sequence of advanced yoga poses.",
        },
      ],
    },
  },
};

export default item;
