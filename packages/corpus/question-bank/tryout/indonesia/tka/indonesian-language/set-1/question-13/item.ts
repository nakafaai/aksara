import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  responses: {
    id: {
      categories: ["Sudah dikendalikan", "Perlu dikendalikan"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Model termometer",
        },
        {
          correctCategoryOrder: 1,
          label: "Waktu tunggu sebelum pencatatan",
        },
        {
          correctCategoryOrder: 2,
          label: "Penggunaan kipas di ruang baca",
        },
      ],
    },
  },
  stimulusKey: "heat-map",
};

export default item;
