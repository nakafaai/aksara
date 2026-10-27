import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  stimulus: "empty-measure",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "ia tidak kecewa ketika klarinetnya tidak disebut",
        },
        {
          correct: false,
          label:
            "ia mempertahankan jumlah ketukan yang sama agar bagian klarinet tetap menonjol",
        },
        {
          correct: false,
          label: "Ayu terlambat karena rantai sepeda",
        },
        {
          correct: false,
          label: "pelatih menghentikan latihan pertama",
        },
        {
          correct: false,
          label: "partitur dicetak dengan satu birama kosong",
        },
      ],
    },
  },
};

export default item;
