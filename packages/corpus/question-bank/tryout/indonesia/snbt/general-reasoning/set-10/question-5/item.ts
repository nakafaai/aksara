import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nia pasti tidak tertular karena paparan tidak menimbulkan risiko infeksi.",
        },
        {
          isCorrect: true,
          label:
            "Nia mungkin tidak tertular, tetapi tertular maupun tidak tertular masih sesuai dengan informasi.",
        },
        {
          isCorrect: false,
          label:
            "Nia pasti tertular karena setiap paparan selalu menyebabkan infeksi.",
        },
        {
          isCorrect: false,
          label:
            "Simpulan tidak relevan karena bacaan tidak membahas penularan influenza.",
        },
        {
          isCorrect: false,
          label:
            "Tidak ada informasi tentang apakah Nia terpapar partikel dari orang yang flu.",
        },
      ],
    },
  },
};

export default item;
