import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kepastian Mutlak tentang kolom infiltrasi dari tiga jenis tanah",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam kolom infiltrasi dari tiga jenis tanah",
        },
        {
          isCorrect: true,
          label: "Kegunaan dan Batas Kolom infiltrasi dari tiga jenis tanah",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap infiltrasi di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label:
            "Satu Aturan untuk Setiap kolom infiltrasi dari tiga jenis tanah",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
