import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Jangkauan antarkuartil tinggi bibit pada media A lebih besar daripada jangkauan antarkuartil tinggi bibit pada media B.",
        },
        {
          correct: false,
          label:
            "Jangkauan tinggi bibit pada media B lebih besar daripada jangkauan tinggi bibit pada media A.",
        },
        {
          correct: true,
          label:
            "Paling sedikit setengah dari bibit pada media B memiliki tinggi $$14\\text{ cm}$$ atau lebih.",
        },
        {
          correct: false,
          label:
            "Median tinggi bibit pada media A lebih besar daripada median tinggi bibit pada media B.",
        },
        {
          correct: true,
          label:
            "Tinggi terendah di antara seluruh $$80$$ bibit terdapat pada media A.",
        },
      ],
    },
  },
};

export default item;
