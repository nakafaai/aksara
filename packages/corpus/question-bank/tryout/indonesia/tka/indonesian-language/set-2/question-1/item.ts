import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  responses: {
    id: {
      categories: ["Meja 1", "Meja 2", "Meja 3"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Mencatat gejala dan tanda bahaya",
        },
        {
          correctCategoryOrder: 2,
          label: "Memilih pengujian yang aman",
        },
        {
          correctCategoryOrder: 3,
          label: "Membandingkan biaya dan kemungkinan umur pakai",
        },
      ],
    },
  },
  stimulusKey: "repair-clinic",
};

export default item;
