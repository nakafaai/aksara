import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "alasan hubungan yang tidak biasa dapat terasa wajar di dalam mimpi.",
        },
        {
          isCorrect: false,
          label:
            "kesulitan mengetahui secara pasti pengalaman hewan yang sedang tidur.",
        },
        {
          isCorrect: false,
          label: "peran tidur REM dalam mengurangi pengendalian sadar saja.",
        },
        {
          isCorrect: false,
          label: "anjuran agar anak-anak tidur setiap selesai belajar.",
        },
        {
          isCorrect: true,
          label:
            "pertanyaan ilmiah dan bukti tentang kemunculan mimpi serta kaitannya dengan pengalaman terjaga dan ingatan.",
        },
      ],
    },
  },
};

export default item;
