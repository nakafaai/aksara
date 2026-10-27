import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Karena 28 lebih tinggi daripada 18 dan 20, tim menetapkan tanda genre sebagai susunan permanen.",
        },
        {
          correct: false,
          label:
            "Tim membandingkan 28, 18, dan 20 serta merencanakan uji di lebih banyak acara tanpa membatasi cakupan simpulan.",
        },
        {
          correct: false,
          label:
            "Tim membatasi simpulan pada beberapa sesi pasar tukar buku dan merencanakan uji lanjutan tanpa melaporkan hasil perbandingan.",
        },
        {
          correct: true,
          label:
            "Tim membandingkan rata-rata 28, 18, dan 20, membatasi simpulan pada beberapa sesi singkat, serta merencanakan uji di lebih banyak acara dengan batas waktu pencarian yang sama.",
        },
        {
          correct: false,
          label:
            "Nilai 28, 18, dan 20 tidak menunjukkan pola yang relevan sehingga tim akan mengubah batas waktu pencarian.",
        },
      ],
    },
  },
};

export default item;
