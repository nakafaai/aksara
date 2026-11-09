import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "quantifiers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Semua barang di kios Pak Joko berasal dari kebunnya sendiri.",
        },
        {
          correct: false,
          label:
            "Tidak ada barang di kios Pak Joko yang pernah disemprot pestisida kimia.",
        },
        {
          correct: false,
          label: "Semua tanaman di kebun Pak Joko adalah tanaman tomat.",
        },
        {
          correct: false,
          label:
            "Sebagian tomat yang dijual di kios Pak Joko berasal dari tanaman yang disemprot pestisida kimia.",
        },
        {
          correct: true,
          label:
            "Sebagian barang di kios Pak Joko berasal dari tanaman yang tidak disemprot pestisida kimia.",
        },
      ],
    },
  },
};

export default item;
