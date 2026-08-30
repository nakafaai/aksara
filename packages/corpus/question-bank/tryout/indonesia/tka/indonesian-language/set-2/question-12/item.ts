import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "tabel membuktikan semua faktor sudah dikendalikan",
        },
        {
          isCorrect: false,
          label: "paragraf menolak seluruh angka pada tabel",
        },
        {
          isCorrect: true,
          label:
            "tabel menunjukkan pola, paragraf menjelaskan keterbatasan penafsirannya",
        },
        {
          isCorrect: false,
          label: "keduanya hanya menjelaskan jenis tanaman",
        },
        {
          isCorrect: false,
          label: "paragraf menyatakan genangan semakin lama",
        },
      ],
    },
  },
  stimulusKey: "rain-garden",
};

export default item;
