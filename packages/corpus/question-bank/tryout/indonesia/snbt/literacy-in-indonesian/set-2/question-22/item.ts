import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua individu hidup pada masa yang sama tetapi bekerja berbeda",
        },
        {
          correct: false,
          label: "Seluruh individu merupakan anggota satu pasukan",
        },
        {
          correct: true,
          label:
            "Jasad berasal dari beberapa masa dan kelompok leluhur genetik",
        },
        {
          correct: false,
          label: "Penelitian hanya menganalisis satu kerangka manusia",
        },
        {
          correct: false,
          label: "DNA membuktikan bahwa wabah menewaskan seluruh individu",
        },
      ],
    },
  },
};

export default item;
