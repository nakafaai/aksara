import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$480\\text{ cm}^3$$ each, no magnesium left, P reacts faster",
        },
        {
          correct: false,
          label:
            "P $$300\\text{ cm}^3$$, Q $$150\\text{ cm}^3$$, $$0.18\\text{ g}$$ left in each, P reacts faster",
        },
        {
          correct: true,
          label:
            "$$300\\text{ cm}^3$$ each, $$0.18\\text{ g}$$ left in each, P reacts faster",
        },
        {
          correct: false,
          label:
            "$$300\\text{ cm}^3$$ each, $$0.18\\text{ g}$$ left in each, both react at the same rate",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$480\\text{ cm}^3$$ setiap satu, tiada magnesium tinggal, P bertindak balas lebih cepat",
        },
        {
          correct: false,
          label:
            "P $$300\\text{ cm}^3$$, Q $$150\\text{ cm}^3$$, $$0.18\\text{ g}$$ tinggal dalam setiap satu, P bertindak balas lebih cepat",
        },
        {
          correct: true,
          label:
            "$$300\\text{ cm}^3$$ setiap satu, $$0.18\\text{ g}$$ tinggal dalam setiap satu, P bertindak balas lebih cepat",
        },
        {
          correct: false,
          label:
            "$$300\\text{ cm}^3$$ setiap satu, $$0.18\\text{ g}$$ tinggal dalam setiap satu, kedua-duanya bertindak balas pada kadar yang sama",
        },
      ],
    },
  },
};

export default item;
