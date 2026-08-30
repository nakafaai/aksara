import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang pengiriman buku antarpulau",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam pengiriman buku antarpulau",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap logistik di Seluruh Dunia",
        },
        {
          isCorrect: true,
          label: "Keputusan Berbasis Bukti dalam pengiriman buku antarpulau",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap pengiriman buku antarpulau",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
