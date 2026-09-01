import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  responses: {
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Melindungi Mira dari pertanyaan yang berulang.",
        },
        {
          isCorrect: false,
          label: "Menjamin Seno akan pulang setiap Jumat.",
        },
        {
          isCorrect: true,
          label: "Memberi bentuk pada harapan Mira.",
        },
        {
          isCorrect: true,
          label: "Mengingatkan Mira agar tetap melanjutkan latihan.",
        },
      ],
    },
  },
  stimulusKey: "seat-seven",
};

export default item;
