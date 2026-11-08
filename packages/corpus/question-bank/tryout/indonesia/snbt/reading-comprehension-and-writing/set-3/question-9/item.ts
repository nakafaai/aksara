import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "coherence",
  },
  stimulus: "stingless-bees",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Madu klanceng paling enak diminum bersama air hangat pada pagi hari.",
        },
        {
          correct: false,
          label:
            "Oleh karena itu, semua petani kopi di Indonesia wajib beternak lebah klanceng.",
        },
        {
          correct: false,
          label:
            "Lebah klanceng biasa bersarang di rongga batang kayu atau bambu.",
        },
        {
          correct: true,
          label:
            "Jadi, lebah klanceng tidak hanya menghasilkan madu, tetapi juga membantu panen kopi warga.",
        },
        {
          correct: false,
          label:
            "Pakaian pelindung peternak lebah biasanya dibuat dari kain tebal.",
        },
      ],
    },
  },
};

export default item;
