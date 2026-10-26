import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Aturan yang Sama untuk Semua Peserta",
        },
        {
          correct: false,
          label: "Tiga Jawaban yang Menyelesaikan Semua Hambatan",
        },
        {
          correct: false,
          label: "Permainan Sempurna setelah Peluit Diganti",
        },
        {
          correct: true,
          label: "Tari Mengubah Aturan setelah Mendengar",
        },
        {
          correct: false,
          label: "Meja Tinggi sebagai Satu-satunya Masalah Taman",
        },
      ],
    },
  },
  stimulus: "passage-5",
};

export default item;
