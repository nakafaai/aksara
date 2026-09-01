import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  responses: {
    id: {
      categories: ["Persemaian", "Penanaman", "Pemantauan"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Mencatat munculnya daun baru",
        },
        {
          correctCategoryOrder: 2,
          label: "Mengikat bibit pada penyangga bambu",
        },
        {
          correctCategoryOrder: 3,
          label: "Mencari penanda yang terbawa arus",
        },
      ],
    },
  },
  stimulusKey: "mangrove-nursery",
};

export default item;
