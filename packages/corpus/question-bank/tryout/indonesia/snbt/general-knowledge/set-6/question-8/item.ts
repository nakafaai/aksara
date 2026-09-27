import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tingkat pengembalian malam pertama membuktikan sistem harus diterapkan permanen tanpa perubahan.",
        },
        {
          isCorrect: true,
          label:
            "Tingkat pengembalian awal mungkin mencampurkan pengaruh insentif dan kedekatan loket.",
        },
        {
          isCorrect: false,
          label:
            "Karena ada keluhan, uang jaminan tidak mungkin memengaruhi perilaku pengunjung.",
        },
        {
          isCorrect: false,
          label: "Satu loket dipindahkan dan jam layanannya diperpanjang.",
        },
        {
          isCorrect: false,
          label:
            "Evaluasi akhir akan memasukkan biaya pencucian dan kehilangan wadah.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
