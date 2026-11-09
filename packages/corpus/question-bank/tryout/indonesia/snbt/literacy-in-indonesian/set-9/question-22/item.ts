import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "batik-wax",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Batik cap lebih bernilai daripada batik tulis karena motifnya lebih rapi.",
        },
        {
          correct: false,
          label:
            "Kain cetak bermotif batik sebaiknya dilarang karena harganya terlalu murah.",
        },
        {
          correct: false,
          label:
            "UNESCO menetapkan batik sebagai warisan budaya karena motifnya sangat beragam.",
        },
        {
          correct: false,
          label:
            "Batik tulis selalu memerlukan waktu berbulan-bulan untuk diselesaikan.",
        },
        {
          correct: true,
          label:
            "Batik ditentukan oleh teknik rintang warna dengan malam, bukan oleh motifnya.",
        },
      ],
    },
  },
};

export default item;
