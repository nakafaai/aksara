import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sumber, metode, dan jejak data dapat diperiksa secara mandiri sebelum klaim diterima.",
        },
        {
          isCorrect: false,
          label:
            "Aturan pengodean yang sama diterapkan pada setiap kelompok dan setiap waktu pengukuran.",
        },
        {
          isCorrect: true,
          label:
            "Instrumen diuji untuk memastikan bahwa skor benar-benar mewakili konsep yang hendak diukur.",
        },
        {
          isCorrect: false,
          label:
            "Satuan, aturan pembulatan, dan batas setiap kategori ditetapkan sebelum pencatatan dimulai.",
        },
        {
          isCorrect: false,
          label:
            "Penilai memakai rubrik yang ditetapkan sebelum mengetahui identitas peserta atau hasil akhirnya.",
        },
      ],
    },
  },
};

export default item;
