import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Semua individu hidup pada masa yang sama tetapi bekerja berbeda",
        },
        {
          isCorrect: false,
          label: "Seluruh individu merupakan anggota satu pasukan",
        },
        {
          isCorrect: true,
          label:
            "Jasad berasal dari beberapa masa dan kelompok leluhur genetik",
        },
        {
          isCorrect: false,
          label: "Penelitian hanya menganalisis satu kerangka manusia",
        },
        {
          isCorrect: false,
          label: "DNA membuktikan bahwa wabah menewaskan seluruh individu",
        },
      ],
    },
  },
};

export default item;
