import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "sachet-waste",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "saset sedikit dari segi berat tetapi banyak dari segi jumlah lembar, dan karena ringan, saset mudah tersebar hingga menyumbat selokan",
        },
        {
          correct: false,
          label: "saset berat sehingga mudah tenggelam dan menyumbat selokan",
        },
        {
          correct: false,
          label: "saset mencakup 40 persen dari berat seluruh sampah plastik",
        },
        {
          correct: false,
          label: "data bank sampah menunjukkan bahwa saset mudah didaur ulang",
        },
        {
          correct: false,
          label: "saset hanya ditemukan di bank sampah, tidak di selokan",
        },
      ],
    },
  },
};

export default item;
