import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "pemeriksaan hasil terhadap acuan agar hasil dapat ditafsirkan secara tepat",
        },
        {
          isCorrect: false,
          label: "menambah jumlah laporan tanpa memeriksa ketepatannya",
        },
        {
          isCorrect: false,
          label: "menghapus semua hasil yang berbeda dari dugaan awal",
        },
        {
          isCorrect: false,
          label:
            "merata-ratakan seluruh pengamatan tanpa memperhitungkan peluang kunjungan",
        },
        {
          isCorrect: false,
          label: "menganggap penilaian ahli selalu benar dan tidak perlu diuji",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
