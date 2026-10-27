import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "alasan hubungan yang tidak biasa dapat terasa wajar di dalam mimpi.",
        },
        {
          correct: false,
          label:
            "kesulitan mengetahui secara pasti pengalaman hewan yang sedang tidur.",
        },
        {
          correct: false,
          label: "peran tidur REM dalam mengurangi pengendalian sadar saja.",
        },
        {
          correct: false,
          label: "anjuran agar anak-anak tidur setiap selesai belajar.",
        },
        {
          correct: true,
          label:
            "pertanyaan ilmiah dan bukti tentang kemunculan mimpi serta kaitannya dengan pengalaman terjaga dan ingatan.",
        },
      ],
    },
  },
};

export default item;
