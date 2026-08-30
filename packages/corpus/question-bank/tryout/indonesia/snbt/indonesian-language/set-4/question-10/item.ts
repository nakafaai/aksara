import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kepastian Mutlak tentang model daur air dalam kotak transparan",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam model daur air dalam kotak transparan",
        },
        {
          isCorrect: true,
          label: "Kegunaan dan Batas Model daur air dalam kotak transparan",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap kondensasi di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label:
            "Satu Aturan untuk Setiap model daur air dalam kotak transparan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
