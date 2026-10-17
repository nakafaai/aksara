import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  responses: {
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Jangkauan antarkuartil tinggi bibit pada media A lebih besar daripada jangkauan antarkuartil tinggi bibit pada media B.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata tinggi bibit pada media A pasti lebih kecil daripada rata-rata tinggi bibit pada media B.",
        },
        {
          isCorrect: true,
          label:
            "Paling sedikit setengah dari bibit pada media B memiliki tinggi $$14\\text{ cm}$$ atau lebih.",
        },
        {
          isCorrect: false,
          label:
            "Median tinggi bibit pada media A lebih besar daripada median tinggi bibit pada media B.",
        },
        {
          isCorrect: true,
          label:
            "Bibit yang paling pendek di antara seluruh $$80$$ bibit tumbuh pada media A.",
        },
      ],
    },
  },
};

export default item;
