import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  responses: {
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Lift bergerak paling cepat pada $$10$$ detik pertama.",
        },
        {
          correctCategoryOrder: 1,
          label: "Lift berada pada ketinggian $$14\\text{ m}$$ tepat tiga kali.",
        },
        {
          correctCategoryOrder: 2,
          label:
            "Pada selang $$16\\le t\\le24$$, ketinggian lift bertambah $$1{,}5\\text{ m}$$ setiap detik.",
        },
        {
          correctCategoryOrder: 2,
          label:
            "Laju rata-rata lift selama $$24$$ detik pertama sama dengan laju rata-rata lift selama $$16$$ detik terakhir.",
        },
      ],
    },
  },
  stimulusKey: "freight-lift",
};

export default item;
