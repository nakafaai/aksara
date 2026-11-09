import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "gamelan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Alat musik Barat modern disetel mengikuti nada acuan yang sama.",
        },
        {
          correct: false,
          label:
            "Pembuat gamelan menyetel setiap instrumen dengan mengikir atau menempa bagian logamnya sampai bunyinya cocok.",
        },
        {
          correct: true,
          label:
            "Setiap perangkat gamelan memiliki penyeteman sendiri yang membedakannya dari perangkat lain.",
        },
        {
          correct: false,
          label: "Bilah gamelan dapat dipinjam dari perangkat mana pun.",
        },
        {
          correct: false,
          label:
            "Laras pelog memiliki lebih banyak nada daripada laras slendro.",
        },
      ],
    },
  },
};

export default item;
