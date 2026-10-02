import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pertanyaan Lila mengubah interaksi di satu meja dari gerak tergesa menjadi penyelidikan bersama, meskipun keramaian aula tetap berlangsung.",
        },
        {
          isCorrect: false,
          label:
            "Lila berhasil menenangkan seluruh aula dengan meminta pengeras suara dan bel pergantian sesi dihentikan.",
        },
        {
          isCorrect: false,
          label:
            "Kartu pertanyaan memberi jawaban yang benar sehingga perdebatan pengunjung langsung selesai.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan suasana terjadi karena jumlah pengunjung di aula berkurang setelah sesi berganti.",
        },
        {
          isCorrect: false,
          label:
            "Tumpukan kartu kosong menunjukkan bahwa pengunjung tidak memiliki rasa ingin tahu sampai Lila memberi mereka jawaban.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
