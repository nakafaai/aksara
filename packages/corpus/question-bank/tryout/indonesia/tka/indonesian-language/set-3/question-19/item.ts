import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "ia tidak kecewa ketika klarinetnya tidak disebut",
        },
        {
          isCorrect: false,
          label:
            "ia mempertahankan jumlah ketukan yang sama agar bagian klarinet tetap menonjol",
        },
        {
          isCorrect: false,
          label: "Ayu terlambat karena rantai sepeda",
        },
        {
          isCorrect: false,
          label: "pelatih menghentikan latihan pertama",
        },
        {
          isCorrect: false,
          label: "partitur dicetak dengan satu birama kosong",
        },
      ],
    },
  },
  stimulusKey: "empty-measure",
};

export default item;
