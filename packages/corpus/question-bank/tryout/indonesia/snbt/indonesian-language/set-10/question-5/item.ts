import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sudut 45 Derajat sebagai Aturan untuk Semua Oven Surya",
        },
        {
          isCorrect: true,
          label: "Menguji Sudut Reflektor pada Oven Surya Model",
        },
        {
          isCorrect: false,
          label: "Mengabaikan Iradiansi dalam Perbandingan Suhu Air",
        },
        {
          isCorrect: false,
          label: "Putaran Ketiga yang Menentukan Sudut Terbaik",
        },
        {
          isCorrect: false,
          label: "Mengapa Posisi Oven Tidak Perlu Diputar",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
