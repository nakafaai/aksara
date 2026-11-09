import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "pattern-interpretation",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Makin banyak pupuk yang diberikan, makin tinggi hasil panennya.",
        },
        {
          correct: true,
          label:
            "Hasil naik sampai sekitar $$150$$ kg pupuk, tetapi pupuk yang lebih banyak justru menurunkan hasil.",
        },
        {
          correct: false,
          label:
            "Pupuk tidak berpengaruh terhadap hasil panen padi di petak-petak itu.",
        },
        {
          correct: false,
          label:
            "Hasil panen tertinggi diperoleh pada pemberian pupuk $$200$$ kg per hektare.",
        },
        {
          correct: false,
          label:
            "Setiap tambahan $$50$$ kg pupuk per hektare selalu menaikkan hasil panen sebesar $$1{,}2$$ ton per hektare.",
        },
      ],
    },
  },
};

export default item;
