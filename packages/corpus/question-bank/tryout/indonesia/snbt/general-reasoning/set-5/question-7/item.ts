import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "assumption",
  },
  stimulus: "robotik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua siswa kelas X tertarik mengikuti ekstrakurikuler robotik.",
        },
        {
          correct: true,
          label:
            "Perbedaan nilai itu terutama disebabkan oleh kegiatan robotik, bukan oleh perbedaan siswa yang memilih ikut.",
        },
        {
          correct: false,
          label:
            "Siswa yang ikut robotik sudah memiliki nilai matematika tinggi sebelum mereka bergabung dengan ekstrakurikuler itu.",
        },
        {
          correct: false,
          label: "Sekolah memiliki cukup guru matematika untuk semua kelas X.",
        },
        {
          correct: false,
          label:
            "Siswa kelas XI yang tidak ikut robotik juga tidak mengikuti ekstrakurikuler lain.",
        },
      ],
    },
  },
};

export default item;
