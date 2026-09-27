import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  responses: {
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Luas minimum yang mungkin adalah $$78{,}21$$ cm².",
        },
        {
          correctCategoryOrder: 1,
          label: "Luas maksimum yang mungkin adalah $$81{,}81$$ cm².",
        },
        {
          correctCategoryOrder: 1,
          label: "Keliling berada di antara $$35{,}6$$ cm dan $$36{,}4$$ cm.",
        },
        {
          correctCategoryOrder: 2,
          label: "Galat luas absolut terbesar adalah $$1{,}8$$ cm².",
        },
        {
          correctCategoryOrder: 1,
          label: "Galat luas relatif terbesar melebihi $$2{,}2\\%$$.",
        },
      ],
    },
  },
};

export default item;
