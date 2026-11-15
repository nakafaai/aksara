import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "fish-auction",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Rp$$80$$ juta",
        },
        {
          correct: true,
          label: "Rp$$90$$ juta",
        },
        {
          correct: false,
          label: "Rp$$100$$ juta",
        },
        {
          correct: false,
          label: "Rp$$110$$ juta",
        },
        {
          correct: false,
          label: "Rp$$200$$ juta",
        },
      ],
    },
  },
};

export default item;
