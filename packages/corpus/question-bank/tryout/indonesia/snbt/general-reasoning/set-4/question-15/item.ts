import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "scheduling",
  },
  stimulus: "budaya",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Gamelan tidak diadakan pada hari Senin.",
        },
        {
          correct: false,
          label:
            "Dongeng diadakan pada hari yang lebih akhir daripada hari batik.",
        },
        {
          correct: false,
          label: "Kuliner diadakan pada hari Rabu.",
        },
        {
          correct: true,
          label: "Kuliner diadakan pada sesi siang.",
        },
        {
          correct: false,
          label:
            "Gamelan diadakan pada hari yang lebih awal daripada hari kuliner.",
        },
      ],
    },
  },
};

export default item;
