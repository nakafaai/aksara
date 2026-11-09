import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ketiga rancangan memerlukan bahan yang sama banyak karena volumenya sama.",
        },
        {
          correct: false,
          label: "Rancangan Q memerlukan bahan paling sedikit.",
        },
        {
          correct: false,
          label:
            "Rancangan P memerlukan bahan $$100\\text{ cm}^2$$ lebih sedikit daripada rancangan R.",
        },
        {
          correct: true,
          label: "Rancangan R memerlukan bahan paling sedikit.",
        },
        {
          correct: false,
          label:
            "Rancangan Q memerlukan bahan $$30\\text{ cm}^2$$ lebih sedikit daripada rancangan P.",
        },
      ],
    },
  },
};

export default item;
