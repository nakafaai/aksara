import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "rain-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "tabel sudah cukup untuk mengisolasi pengaruh taman dari perubahan intensitas hujan",
        },
        {
          correct: true,
          label:
            "tabel menunjukkan pola, paragraf menjelaskan keterbatasan penafsirannya",
        },
        {
          correct: false,
          label:
            "paragraf menilai pola pada tabel kurang berguna karena intensitas hujan berbeda",
        },
        {
          correct: false,
          label:
            "tabel merangkum jenis tanaman, sedangkan paragraf menilai kondisi tanahnya",
        },
        {
          correct: false,
          label: "paragraf menyatakan genangan semakin lama",
        },
      ],
    },
  },
};

export default item;
