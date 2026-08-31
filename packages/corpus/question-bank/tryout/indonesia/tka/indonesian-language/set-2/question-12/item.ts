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
          label:
            "tabel sudah cukup untuk mengisolasi pengaruh taman dari perubahan intensitas hujan",
        },
        {
          isCorrect: true,
          label:
            "tabel menunjukkan pola, paragraf menjelaskan keterbatasan penafsirannya",
        },
        {
          isCorrect: false,
          label:
            "paragraf menilai pola pada tabel kurang berguna karena intensitas hujan berbeda",
        },
        {
          isCorrect: false,
          label:
            "tabel merangkum jenis tanaman, sedangkan paragraf menilai kondisi tanahnya",
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
