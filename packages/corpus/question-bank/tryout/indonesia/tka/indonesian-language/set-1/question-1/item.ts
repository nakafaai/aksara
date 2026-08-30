import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  responses: {
    id: {
      categories: ["Masukan", "Proses", "Keluaran"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Amplop benih yang dibawa pulang warga",
        },
        {
          correctCategoryOrder: 2,
          label: "Pengeringan benih setelah panen",
        },
        {
          correctCategoryOrder: 3,
          label: "Kartu riwayat yang telah diisi",
        },
      ],
    },
  },
  stimulusKey: "seed-library",
};

export default item;
