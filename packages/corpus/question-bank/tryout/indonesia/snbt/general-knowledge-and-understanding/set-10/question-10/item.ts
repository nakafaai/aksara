import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "jamu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jamu adalah warisan budaya Indonesia yang diakui oleh UNESCO pada akhir tahun 2023.",
        },
        {
          correct: false,
          label:
            "Resep jamu sebaiknya tidak lagi diwariskan dari orang tua kepada generasi berikutnya.",
        },
        {
          correct: false,
          label:
            "Fitofarmaka selalu lebih enak rasanya daripada jamu tradisional buatan rumah tangga.",
        },
        {
          correct: false,
          label:
            "Obat herbal terstandar tidak perlu lagi diawasi oleh BPOM karena sudah diuji pada hewan.",
        },
        {
          correct: true,
          label:
            "BPOM membagi obat bahan alam ke dalam tiga kelompok menurut kuatnya bukti khasiat.",
        },
      ],
    },
  },
};

export default item;
