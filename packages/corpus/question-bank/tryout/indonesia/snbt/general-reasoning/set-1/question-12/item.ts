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
          correct: false,
          label:
            "Gedung latihan disewa dengan uang kas paduan suara dan paduan suara mengikuti festival tingkat nasional.",
        },
        {
          correct: false,
          label:
            "Sponsor baru tidak bergabung dan gedung latihan tidak disewa dengan uang kas paduan suara.",
        },
        {
          correct: false,
          label:
            "Latihan tambahan diadakan setiap Sabtu dan pelatih vokal tamu tidak diundang.",
        },
        {
          correct: false,
          label:
            "Sponsor baru bergabung dan latihan tambahan diadakan setiap Sabtu.",
        },
        {
          correct: true,
          label:
            "Sponsor baru tidak bergabung dan latihan tambahan diadakan setiap Sabtu.",
        },
      ],
    },
  },
};

export default item;
