import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-6",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pertanyaan Lila mengubah interaksi di satu meja dari gerak tergesa menjadi penyelidikan bersama, meskipun keramaian aula tetap berlangsung.",
        },
        {
          correct: false,
          label:
            "Lila berhasil menenangkan seluruh aula dengan meminta pengeras suara dan bel pergantian sesi dihentikan.",
        },
        {
          correct: false,
          label:
            "Kartu pertanyaan memberi jawaban yang benar sehingga perdebatan pengunjung langsung selesai.",
        },
        {
          correct: false,
          label:
            "Perubahan suasana terjadi karena jumlah pengunjung di aula berkurang setelah sesi berganti.",
        },
        {
          correct: false,
          label:
            "Tumpukan kartu kosong menunjukkan bahwa pengunjung tidak memiliki rasa ingin tahu sampai Lila memberi mereka jawaban.",
        },
      ],
    },
  },
};

export default item;
