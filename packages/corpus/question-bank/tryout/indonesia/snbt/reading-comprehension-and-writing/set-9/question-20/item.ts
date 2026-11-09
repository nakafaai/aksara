import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "conclusion",
  },
  stimulus: "tooth-brushing",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua siswa SD Negeri 2 Rawamulya kini tidak lagi bergigi berlubang.",
        },
        {
          correct: true,
          label:
            "Kegiatan sikat gigi bersama diikuti turunnya siswa bergigi berlubang di semua kelas, terutama pada siswa yang rutin mengikutinya.",
        },
        {
          correct: false,
          label: "Siswa kelas III paling malas menyikat gigi di rumah.",
        },
        {
          correct: false,
          label: "Surat kepada orang tua membuat gigi siswa membaik.",
        },
        {
          correct: false,
          label: "Banyak siswa yang diperiksa berkurang setelah enam bulan.",
        },
      ],
    },
  },
};

export default item;
