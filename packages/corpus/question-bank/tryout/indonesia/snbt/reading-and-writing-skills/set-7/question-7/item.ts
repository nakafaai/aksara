import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Siswa memesan sehari sebelumnya karena cara memilih di meja saji terbukti selalu gagal.",
        },
        {
          isCorrect: false,
          label:
            "Pemesanan sehari sebelumnya diterapkan permanen dan pilihan di meja saji tidak digunakan lagi.",
        },
        {
          isCorrect: false,
          label:
            "Tim memakai pemesanan awal dan pilihan pagi hari tanpa memisahkan kondisi pembanding.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan pemesanan awal hanya dengan komentar tentang pilihan di meja saji.",
        },
        {
          isCorrect: true,
          label:
            "Pada sesi uji, siswa memesan sehari sebelumnya, sedangkan pada sesi pembanding mereka memilih menu di meja saji pada pagi hari.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
