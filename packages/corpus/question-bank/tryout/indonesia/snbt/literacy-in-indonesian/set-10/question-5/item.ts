import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "shorebird-flyway",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "P, karena luasnya paling besar sehingga burung tetap punya banyak lumpur di tempat lain",
        },
        {
          correct: true,
          label:
            "Q, karena masih ada dua pengganti dalam jangkauan terbang, asalkan tempat bertengger di dekat pengganti itu tetap aman",
        },
        {
          correct: false,
          label:
            "R, karena penggantinya masih memiliki hamparan lumpur yang luas",
        },
        {
          correct: false,
          label:
            "P, karena burung cukup pindah ke dataran lumpur lain, berapa pun jaraknya",
        },
        {
          correct: false,
          label:
            "Q, karena luasnya paling kecil, sehingga hilangnya sama sekali tidak berpengaruh pada burung",
        },
      ],
    },
  },
};

export default item;
