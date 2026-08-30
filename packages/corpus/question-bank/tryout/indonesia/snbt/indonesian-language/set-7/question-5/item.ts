import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang produksi gas pada campuran ragi",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam produksi gas pada campuran ragi",
        },
        {
          isCorrect: true,
          label:
            "Menguji air bersuhu 35 derajat Celsius dalam produksi gas pada campuran ragi",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap hipotesis di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap produksi gas pada campuran ragi",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
