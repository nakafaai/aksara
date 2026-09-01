import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  responses: {
    id: {
      categories: ["Mengurangi gangguan", "Memperjelas isi", "Menjaga akses"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Menyediakan earphone",
        },
        {
          correctCategoryOrder: 2,
          label: "Mengganti nama audio menjadi pertanyaan",
        },
        {
          correctCategoryOrder: 3,
          label: "Menambahkan transkrip",
        },
      ],
    },
  },
  stimulusKey: "audio-labels",
};

export default item;
