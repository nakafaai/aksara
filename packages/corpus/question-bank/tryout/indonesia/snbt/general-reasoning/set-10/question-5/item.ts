import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Nia pasti tidak tertular karena paparan tidak menimbulkan risiko infeksi.",
        },
        {
          correct: true,
          label:
            "Nia mungkin tidak tertular, tetapi tertular maupun tidak tertular masih sesuai dengan informasi.",
        },
        {
          correct: false,
          label:
            "Nia pasti tertular karena setiap paparan selalu menyebabkan infeksi.",
        },
        {
          correct: false,
          label:
            "Simpulan tidak relevan karena bacaan tidak membahas penularan influenza.",
        },
        {
          correct: false,
          label:
            "Tidak ada informasi tentang apakah Nia terpapar partikel dari orang yang flu.",
        },
      ],
    },
  },
};

export default item;
