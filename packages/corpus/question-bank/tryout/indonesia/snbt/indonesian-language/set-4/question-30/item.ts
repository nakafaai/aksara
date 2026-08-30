import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Serpihan cat biru di bangunan tua yang sedang dipugar",
        },
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang bangunan tua yang sedang dipugar",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam bangunan tua yang sedang dipugar",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap foreshadowing di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap bangunan tua yang sedang dipugar",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
