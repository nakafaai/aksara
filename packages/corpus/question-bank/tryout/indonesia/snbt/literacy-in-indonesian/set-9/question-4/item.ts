import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "peat-fire",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menggali kanal baru agar air hujan lebih cepat keluar dari lahan.",
        },
        {
          correct: false,
          label:
            "Menyiapkan lebih banyak pesawat penyiram air untuk musim kemarau.",
        },
        {
          correct: false,
          label:
            "Membakar sisa tanaman sebelum musim kemarau agar bahan bakar habis.",
        },
        {
          correct: true,
          label:
            "Menyekat kanal agar air tertahan dan permukaan air tanah tetap tinggi.",
        },
        {
          correct: false,
          label:
            "Menanam lebih banyak tanaman di permukaan gambut agar tanah tidak ikut menyusut.",
        },
      ],
    },
  },
};

export default item;
