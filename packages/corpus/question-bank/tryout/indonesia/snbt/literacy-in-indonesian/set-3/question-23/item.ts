import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "youth-pledge",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Ikrar 1928 menyatakan bahwa para pemuda mengaku berbahasa satu.",
        },
        {
          column: 1,
          label:
            "Bahasa Melayu dipahami di banyak daerah karena lama menjadi bahasa perdagangan.",
        },
        {
          column: 2,
          label:
            "Nama bahasa Indonesia sudah disepakati pada Kongres Pemuda I tahun 1926.",
        },
        {
          column: 1,
          label:
            "Bahasa Indonesia ditetapkan sebagai bahasa negara dalam Undang-Undang Dasar 1945.",
        },
      ],
    },
  },
};

export default item;
