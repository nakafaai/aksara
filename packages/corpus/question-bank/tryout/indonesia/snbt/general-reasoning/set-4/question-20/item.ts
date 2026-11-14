import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "arrangement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Lompatan Irfan adalah yang terjauh.",
        },
        {
          correct: false,
          label: "Lompatan Lukas lebih pendek daripada lompatan Nadia.",
        },
        {
          correct: false,
          label: "Lompatan Nadia adalah yang terjauh.",
        },
        {
          correct: false,
          label: "Lompatan Jihan termasuk tiga lompatan terjauh.",
        },
        {
          correct: true,
          label: "Lompatan Irfan termasuk tiga lompatan terjauh.",
        },
      ],
    },
  },
};

export default item;
