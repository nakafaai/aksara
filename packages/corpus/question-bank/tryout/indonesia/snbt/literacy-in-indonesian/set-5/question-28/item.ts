import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "pollinators",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "petani durian tidak tertarik mempelajari cara kelelawar menyerbuki bunga",
        },
        {
          correct: true,
          label:
            "sumber masalah panen dapat berada jauh di luar kebun yang terdampak",
        },
        {
          correct: false,
          label:
            "kerusakan gua selalu terjadi diam-diam tanpa diketahui oleh siapa pun",
        },
        {
          correct: false,
          label:
            "kelelawar pemakan nektar menyerbuki durian hanya pada malam tertentu",
        },
        {
          correct: false,
          label: "panen durian turun karena bunga mekar pada waktu yang salah",
        },
      ],
    },
  },
};

export default item;
