import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "conditional-chain",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Hari ini tidak hujan dan tidak ada angin kencang.",
        },
        {
          correct: false,
          label: "Hari ini hujan, tetapi tidak ada angin kencang.",
        },
        {
          correct: false,
          label: "Pertunjukan wayang hari ini dipindahkan ke dalam gedung.",
        },
        {
          correct: false,
          label:
            "Penonton pertunjukan wayang hari ini lebih dari $$200$$ orang.",
        },
        {
          correct: false,
          label: "Hari ini ada angin kencang, tetapi tidak hujan.",
        },
      ],
    },
  },
};

export default item;
