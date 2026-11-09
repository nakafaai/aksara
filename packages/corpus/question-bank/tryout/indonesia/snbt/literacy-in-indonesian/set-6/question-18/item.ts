import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-comparison",
  },
  stimulus: "food-estate",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "sawah baru perlu dibuka di lahan gambut agar produksi beras naik",
        },
        {
          correct: false,
          label:
            "impor beras sebaiknya dihentikan sama sekali mulai tahun depan",
        },
        {
          correct: false,
          label:
            "pangan lokal sebaiknya menggantikan beras sebagai makanan pokok",
        },
        {
          correct: true,
          label:
            "negara perlu memperkuat pangannya agar tidak mudah terguncang",
        },
        {
          correct: false,
          label: "mesin modern tidak cocok dipakai oleh para petani kecil",
        },
      ],
    },
  },
};

export default item;
