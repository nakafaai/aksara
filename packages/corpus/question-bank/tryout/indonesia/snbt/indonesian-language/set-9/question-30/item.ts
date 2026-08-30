import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Label kain di gudang kostum teater",
        },
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang gudang kostum teater",
        },
        {
          isCorrect: false,
          label: "Alasan Mengabaikan Semua Bukti dalam gudang kostum teater",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap motif di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap gudang kostum teater",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
