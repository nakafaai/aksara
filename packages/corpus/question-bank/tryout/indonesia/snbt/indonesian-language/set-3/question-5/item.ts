import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang perkecambahan kacang hijau",
        },
        {
          isCorrect: true,
          label:
            "Menguji pencahayaan enam jam dengan jarak lampu yang tetap dalam perkecambahan kacang hijau",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam perkecambahan kacang hijau",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap variabel kontrol di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap perkecambahan kacang hijau",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
