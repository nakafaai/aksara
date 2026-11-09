import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-6",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Cara Lila Menenangkan Seluruh Aula Pameran",
        },
        {
          correct: false,
          label: "Jawaban Lila atas Percobaan Cahaya dan Bayangan",
        },
        {
          correct: false,
          label: "Bunyi Pameran yang Tidak Pernah Berubah",
        },
        {
          correct: false,
          label: "Kartu Kosong sebagai Tanda Gagal Bertanya",
        },
        {
          correct: true,
          label: "Satu Pertanyaan di Tengah Riuh Pameran",
        },
      ],
    },
  },
};

export default item;
