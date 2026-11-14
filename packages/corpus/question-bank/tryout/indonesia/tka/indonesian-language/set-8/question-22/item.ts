import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  stimulus: "electric-bus",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "pernyataan itu tepat karena biaya energi bus listrik lebih rendah",
        },
        {
          correct: false,
          label:
            "pernyataan itu salah karena bus listrik lebih boros energi daripada bus solar",
        },
        {
          correct: false,
          label:
            "pernyataan itu tepat karena penumpang menyukai bus yang lebih tenang",
        },
        {
          correct: true,
          label:
            "pernyataan itu berlebihan karena belum memperhitungkan harga beli, penggantian baterai, dan waktu pengisian yang lama",
        },
        {
          correct: false,
          label: "pernyataan itu tidak berhubungan dengan hasil uji coba",
        },
      ],
    },
  },
};

export default item;
