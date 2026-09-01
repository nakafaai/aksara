import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Percobaan membuktikan bahwa semua jenis tumbuhan kehilangan sebagian besar air hanya melalui permukaan bawah daun.",
        },
        {
          isCorrect: false,
          label:
            "Percobaan menunjukkan bahwa petroleum jelly menambah massa daun sehingga pengukuran kehilangan air tidak dapat ditafsirkan sama sekali.",
        },
        {
          isCorrect: true,
          label:
            "Pada daun kacang yang dipetik, pelapisan permukaan bawah berkaitan dengan kehilangan massa paling kecil, tetapi hasil satu jenis daun belum dapat digeneralisasi ke semua tumbuhan.",
        },
        {
          isCorrect: false,
          label:
            "Pelapisan permukaan atas tidak memengaruhi transpirasi karena rata-rata 0,74 gram sama dengan 0,82 gram.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan ketiga rata-rata hanya dapat dijelaskan oleh letak stomata karena seluruh sumber ketidakpastian sudah dikendalikan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
