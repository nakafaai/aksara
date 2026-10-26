import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Siswa memesan sehari sebelumnya karena cara memilih di meja saji terbukti selalu gagal.",
        },
        {
          correct: false,
          label:
            "Pemesanan sehari sebelumnya diterapkan permanen dan pilihan di meja saji tidak digunakan lagi.",
        },
        {
          correct: false,
          label:
            "Tim memakai pemesanan awal dan pilihan pagi hari tanpa memisahkan kondisi pembanding.",
        },
        {
          correct: false,
          label:
            "Tim membandingkan pemesanan awal hanya dengan komentar tentang pilihan di meja saji.",
        },
        {
          correct: true,
          label:
            "Pada sesi uji, siswa memesan sehari sebelumnya, sedangkan pada sesi pembanding mereka memilih menu di meja saji pada pagi hari.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
