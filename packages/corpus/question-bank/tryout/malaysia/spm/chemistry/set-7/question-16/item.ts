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
            "$$480\\text{ cm}^3$$ each, $$0\\text{ g}$$ copper, P reacts faster",
        },
        {
          correct: false,
          label:
            "P $$300\\text{ cm}^3$$, Q $$150\\text{ cm}^3$$, $$1.36\\text{ g}$$ copper, P reacts faster",
        },
        {
          correct: true,
          label:
            "$$300\\text{ cm}^3$$ each, $$0.96\\text{ g}$$ copper, P reacts faster",
        },
        {
          correct: false,
          label:
            "$$300\\text{ cm}^3$$ each, $$0.96\\text{ g}$$ copper, both react at the same rate",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$480\\text{ cm}^3$$ setiap satu, $$0\\text{ g}$$ kuprum, P bertindak balas lebih cepat",
        },
        {
          correct: false,
          label:
            "P $$300\\text{ cm}^3$$, Q $$150\\text{ cm}^3$$, $$1.36\\text{ g}$$ kuprum, P bertindak balas lebih cepat",
        },
        {
          correct: true,
          label:
            "$$300\\text{ cm}^3$$ setiap satu, $$0.96\\text{ g}$$ kuprum, P bertindak balas lebih cepat",
        },
        {
          correct: false,
          label:
            "$$300\\text{ cm}^3$$ setiap satu, $$0.96\\text{ g}$$ kuprum, kedua-duanya bertindak balas sama cepat",
        },
      ],
    },
  },
};

export default item;
