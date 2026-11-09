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
          label: "Guru pembina menilai siswa tidak panik ketika gempa terjadi.",
        },
        {
          correct: true,
          label:
            "Waktu siswa berkumpul di lapangan makin singkat karena latihan diulang.",
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
