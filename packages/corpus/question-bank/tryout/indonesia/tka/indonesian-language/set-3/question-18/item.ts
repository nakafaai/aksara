import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "meaning-relations",
  },
  stimulus: "empty-measure",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Rafi diam-diam menulis banyak not baru",
        },
        {
          correct: true,
          label: "diam diisi oleh perhatian dan kesediaan menunggu",
        },
        {
          correct: false,
          label: "penonton sudah memenuhi ruang konser",
        },
        {
          correct: false,
          label: "Ayu tidak lagi memainkan cello",
        },
        {
          correct: false,
          label:
            "pelatih mengubah susunan partitur agar jeda tidak lagi muncul pada bagian cello",
        },
      ],
    },
  },
};

export default item;
