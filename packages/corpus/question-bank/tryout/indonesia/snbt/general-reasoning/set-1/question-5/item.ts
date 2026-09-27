import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Angka itu merupakan bagian anggaran yang tersisa untuk kebutuhan kementerian lainnya.",
        },
        {
          isCorrect: false,
          label: "Angka itu merupakan kenaikan produksi padi yang dilaporkan.",
        },
        {
          isCorrect: true,
          label:
            "Angka itu merupakan bagian dari total anggaran kementerian yang dibelanjakan untuk sarana dan prasarana produksi pertanian.",
        },
        {
          isCorrect: false,
          label:
            "Angka itu merupakan kenaikan produksi jagung yang dilaporkan.",
        },
        {
          isCorrect: false,
          label:
            "Angka itu merupakan bagian anggaran yang hanya digunakan untuk mengatur impor.",
        },
      ],
    },
  },
};

export default item;
