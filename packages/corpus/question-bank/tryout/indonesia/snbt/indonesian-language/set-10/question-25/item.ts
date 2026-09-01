import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Aturan yang Sama untuk Semua Peserta",
        },
        {
          isCorrect: false,
          label: "Tiga Jawaban yang Menyelesaikan Semua Hambatan",
        },
        {
          isCorrect: false,
          label: "Permainan Sempurna setelah Peluit Diganti",
        },
        {
          isCorrect: true,
          label: "Tari Mengubah Aturan setelah Mendengar",
        },
        {
          isCorrect: false,
          label: "Meja Tinggi sebagai Satu-satunya Masalah Taman",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
