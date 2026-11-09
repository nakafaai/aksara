import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "village-tourism",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menghentikan kunjungan wisatawan pada akhir pekan secara bertahap.",
        },
        {
          correct: true,
          label:
            "Melayani minat wisatawan tanpa mengubah upacara menjadi pertunjukan.",
        },
        {
          correct: false,
          label:
            "Memindahkan upacara syukur panen ke hari Sabtu agar lebih ramai.",
        },
        {
          correct: false,
          label:
            "Mengganti upacara syukur panen dengan pertunjukan tari dan musik.",
        },
        {
          correct: false,
          label: "Membuka area keramat bagi wisatawan pada akhir pekan saja.",
        },
      ],
    },
  },
};

export default item;
