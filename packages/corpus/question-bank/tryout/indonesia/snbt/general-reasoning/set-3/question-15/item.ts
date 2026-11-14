import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "arrangement",
  },
  stimulus: "rapat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Cahya bersebelahan dengan Fajar.",
        },
        {
          correct: false,
          label: "Galuh duduk di kursi bernomor genap.",
        },
        {
          correct: false,
          label: "Nomor kursi Asri lebih kecil daripada nomor kursi Fajar.",
        },
        {
          correct: false,
          label: "Nomor kursi Bonar lebih kecil daripada nomor kursi Hamid.",
        },
        {
          correct: true,
          label: "Fajar duduk di kursi bernomor genap.",
        },
      ],
    },
  },
};

export default item;
