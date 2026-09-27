import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena 28 lebih tinggi daripada 18 dan 20, tim menetapkan tanda genre sebagai susunan permanen.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 28, 18, dan 20 serta merencanakan uji di lebih banyak acara tanpa membatasi cakupan simpulan.",
        },
        {
          isCorrect: false,
          label:
            "Tim membatasi simpulan pada beberapa sesi pasar tukar buku dan merencanakan uji lanjutan tanpa melaporkan hasil perbandingan.",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan rata-rata 28, 18, dan 20, membatasi simpulan pada beberapa sesi singkat, serta merencanakan uji di lebih banyak acara dengan batas waktu pencarian yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 28, 18, dan 20 tidak menunjukkan pola yang relevan sehingga tim akan mengubah batas waktu pencarian.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
