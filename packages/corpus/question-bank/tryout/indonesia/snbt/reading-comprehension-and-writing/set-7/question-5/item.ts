import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "medicine-return",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Obat itu dapat dipakai kembali oleh warga lain dengan aman.",
        },
        {
          correct: false,
          label: "Kotak pengembalian obat menjadi lebih cepat penuh.",
        },
        {
          correct: true,
          label: "Air di sekitar permukiman dapat tercemar zat dari obat.",
        },
        {
          correct: false,
          label:
            "Dinas kesehatan memusnahkan obat itu dengan alat pembakar khusus.",
        },
        {
          correct: false,
          label: "Puskesmas menutup kotak pengembalian obat.",
        },
      ],
    },
  },
};

export default item;
