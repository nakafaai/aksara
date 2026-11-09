import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "text-structure",
  },
  stimulus: "water-turn",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "pendapat, alasan, lalu contoh",
        },
        {
          correct: true,
          label: "masalah dan akibatnya, lalu cara mengatasinya dan hasilnya",
        },
        {
          correct: false,
          label: "hasil, lalu penyebab hasil itu",
        },
        {
          correct: false,
          label: "cara mengatasi masalah, lalu masalahnya",
        },
        {
          correct: false,
          label: "perbandingan keadaan dua desa",
        },
      ],
    },
  },
};

export default item;
