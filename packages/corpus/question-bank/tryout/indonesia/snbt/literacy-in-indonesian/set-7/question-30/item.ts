import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Cara Lila Menenangkan Seluruh Aula Pameran",
        },
        {
          isCorrect: false,
          label: "Jawaban Lila atas Percobaan Cahaya dan Bayangan",
        },
        {
          isCorrect: false,
          label: "Bunyi Pameran yang Tidak Pernah Berubah",
        },
        {
          isCorrect: false,
          label: "Kartu Kosong sebagai Tanda Gagal Bertanya",
        },
        {
          isCorrect: true,
          label: "Satu Pertanyaan di Tengah Riuh Pameran",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
