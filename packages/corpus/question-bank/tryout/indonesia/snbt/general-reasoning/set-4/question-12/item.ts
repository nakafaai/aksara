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
          label: "Mesin espresso tidak rusak dan teknisi tidak dipanggil.",
        },
        {
          correct: false,
          label: "Mesin espresso rusak dan kedai membayar biaya servis.",
        },
        {
          correct: true,
          label: "Mesin espresso rusak dan teknisi dipanggil.",
        },
        {
          correct: false,
          label: "Barista utama tidak masuk atau mesin espresso tidak rusak.",
        },
        {
          correct: false,
          label: "Teknisi dipanggil, tetapi kedai tidak membayar biaya servis.",
        },
      ],
    },
  },
};

export default item;
