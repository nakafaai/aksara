import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang model penyaringan air keruh",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam model penyaringan air keruh",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap indikator di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap model penyaringan air keruh",
        },
        {
          isCorrect: true,
          label:
            "Menguji susunan kerikil, pasir, dan arang dengan ketebalan sama dalam model penyaringan air keruh",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
