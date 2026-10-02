import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "menolak seluruh program sebelum mencobanya",
        },
        {
          isCorrect: false,
          label: "menunggu petugas mengubah tujuan program",
        },
        {
          isCorrect: false,
          label: "tidak mengetahui hasil akhir yang diinginkan pengelola",
        },
        {
          isCorrect: true,
          label:
            "belum yakin tindakan yang harus dilakukan setelah tahap saat ini",
        },
        {
          isCorrect: false,
          label: "memilih langkah berbeda untuk menguji hipotesis",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
