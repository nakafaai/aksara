import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "main-idea",
  },
  stimulus: "quake-drill",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sekolah mengadakan latihan gempa dua kali setiap semester.",
        },
        {
          correct: false,
          label:
            "Banyak siswa berlari dan berdesakan di tangga pada latihan pertama.",
        },
        {
          correct: false,
          label:
            "Guru pembina akan menilai kesiapan siswa ketika gempa sungguhan terjadi.",
        },
        {
          correct: true,
          label:
            "Latihan yang diulang membuat siswa makin cepat dan tertib menuju lapangan serta tidak panik.",
        },
        {
          correct: false,
          label: "Jalur keluar kelas ditandai panah hijau.",
        },
      ],
    },
  },
};

export default item;
