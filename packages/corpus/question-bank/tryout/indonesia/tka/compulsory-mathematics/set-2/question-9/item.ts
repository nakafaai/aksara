import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "sequences-series",
  },
  responses: {
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "$$u_1=5$$",
        },
        {
          correctCategoryOrder: 1,
          label: "Bedanya adalah $$6$$.",
        },
        {
          correctCategoryOrder: 1,
          label: "$$u_{10}=59$$",
        },
        {
          correctCategoryOrder: 1,
          label: "$$S_{10}=320$$",
        },
        {
          correctCategoryOrder: 2,
          label: "$$u_5=31$$",
        },
      ],
    },
  },
};

export default item;
