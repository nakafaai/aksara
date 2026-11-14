import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "assumption",
  },
  stimulus: "ride-hailing",
  versions: {
    id: {
      columns: ["Teks A", "Teks B"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Siapa yang mengendalikan cara orang bekerja menentukan kewajiban apa yang harus ia tanggung.",
        },
        {
          column: 2,
          label:
            "Sebuah perlindungan dapat merugikan sebagian orang yang hendak dilindunginya.",
        },
        {
          column: 2,
          label:
            "Hak tertentu dapat dijamin tanpa mengubah status hubungan kerja.",
        },
        {
          column: 1,
          label:
            "Kebebasan yang dibatasi oleh syarat penghasilan tidak sepenuhnya dapat disebut kebebasan.",
        },
      ],
    },
  },
};

export default item;
