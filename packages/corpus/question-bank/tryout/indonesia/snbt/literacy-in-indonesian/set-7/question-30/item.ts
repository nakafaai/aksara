import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
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
  stimulus: "passage-6",
};

export default item;
