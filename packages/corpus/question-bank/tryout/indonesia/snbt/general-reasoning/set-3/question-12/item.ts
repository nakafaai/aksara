import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "modus-tollens",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Harga cabai segar naik minggu ini.",
        },
        {
          correct: true,
          label: "Harga cabai segar tidak naik minggu ini.",
        },
        {
          correct: false,
          label: "Bu Sari membeli cabai segar lebih banyak daripada biasanya.",
        },
        {
          correct: false,
          label: "Bu Sari tidak membeli cabai sama sekali minggu ini.",
        },
        {
          correct: false,
          label: "Harga cabai kering turun minggu ini.",
        },
      ],
    },
  },
};

export default item;
