import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Melindungi Mira dari pertanyaan yang berulang.",
        },
        {
          correct: false,
          label: "Menjamin Seno akan pulang setiap Jumat.",
        },
        {
          correct: true,
          label: "Memberi bentuk pada harapan Mira.",
        },
        {
          correct: true,
          label: "Mengingatkan Mira agar tetap melanjutkan latihan.",
        },
      ],
    },
  },
  stimulus: "seat-seven",
};

export default item;
