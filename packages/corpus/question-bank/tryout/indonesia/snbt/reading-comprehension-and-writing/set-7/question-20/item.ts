import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Karena 32 lebih tinggi daripada 24 dan 26, tim menyatakan kode pasti efektif dan menerapkannya secara permanen.",
        },
        {
          correct: true,
          label:
            "Tim membandingkan rata-rata 32, 24, dan 26, membatasi simpulan karena pengaruh cuaca belum dipisahkan, serta merencanakan perbandingan beberapa pola cuaca dengan batas pengembalian dua hari yang sama.",
        },
        {
          correct: false,
          label:
            "Tim membandingkan 32, 24, dan 26 serta merencanakan uji lanjutan tanpa membatasi cakupan klaim.",
        },
        {
          correct: false,
          label:
            "Tim membatasi simpulan karena pengaruh cuaca belum dipisahkan dan merencanakan uji lanjutan tanpa melaporkan perbandingan hasil.",
        },
        {
          correct: false,
          label:
            "Nilai 32, 24, dan 26 tidak menunjukkan pola yang relevan sehingga tim akan mengubah batas waktu pengembalian.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
