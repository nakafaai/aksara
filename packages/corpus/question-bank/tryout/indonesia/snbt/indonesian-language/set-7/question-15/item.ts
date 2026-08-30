import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang antrean pemeriksaan kesehatan",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam antrean pemeriksaan kesehatan",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap alur layanan di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap antrean pemeriksaan kesehatan",
        },
        {
          isCorrect: true,
          label: "Keputusan Berbasis Bukti dalam antrean pemeriksaan kesehatan",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
