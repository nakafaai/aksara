import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "dawn-market",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "timbangan tua itu sudah rusak sehingga tidak dapat dipakai lagi",
        },
        {
          correct: false,
          label:
            "pedagang di pasar itu menolak setiap tawaran yang diajukan pembeli",
        },
        {
          correct: false,
          label:
            "suara decit timbangan tua itu lebih keras daripada suara para pembeli di pasar",
        },
        {
          correct: true,
          label:
            "timbangan jujur menunjukkan berat, sedangkan orang kerap bersiasat saat menawar",
        },
        {
          correct: false,
          label:
            "pembeli mungkin lebih suka menawar kepada timbangan daripada pedagang",
        },
      ],
    },
  },
};

export default item;
