import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "conclusion",
  },
  stimulus: "atap",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pengecatan atap putih membuat tagihan listrik bulanan rumah di kelurahan itu turun secara nyata.",
        },
        {
          correct: true,
          label:
            "Plafon meredam sebagian pengaruh warna atap terhadap suhu ruang utama pada siang hari.",
        },
        {
          correct: false,
          label:
            "Rumah tanpa plafon di kelurahan itu lebih panas daripada rumah berplafon.",
        },
        {
          correct: false,
          label:
            "Selisih suhu yang sama akan terjadi jika atap genting tanah liat dicat putih.",
        },
        {
          correct: false,
          label:
            "Kipas angin memakai sebagian besar listrik rumah tangga di kelurahan itu.",
        },
      ],
    },
  },
};

export default item;
