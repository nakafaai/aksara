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
            "P $$300\\text{ cm}^3$$, Q $$150\\text{ cm}^3$$, and P reacts faster",
        },
        {
          correct: false,
          label:
            "P $$300\\text{ cm}^3$$, Q $$300\\text{ cm}^3$$, and both react at the same rate",
        },
        {
          correct: true,
          label:
            "P $$120\\text{ cm}^3$$, Q $$120\\text{ cm}^3$$, and P reacts faster",
        },
        {
          correct: false,
          label:
            "P $$120\\text{ cm}^3$$, Q $$120\\text{ cm}^3$$, and both react at the same rate",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "P $$300\\text{ cm}^3$$, Q $$150\\text{ cm}^3$$, dan P bertindak balas lebih cepat",
        },
        {
          correct: false,
          label:
            "P $$300\\text{ cm}^3$$, Q $$300\\text{ cm}^3$$, dan kedua-duanya bertindak balas pada kadar yang sama",
        },
        {
          correct: true,
          label:
            "P $$120\\text{ cm}^3$$, Q $$120\\text{ cm}^3$$, dan P bertindak balas lebih cepat",
        },
        {
          correct: false,
          label:
            "P $$120\\text{ cm}^3$$, Q $$120\\text{ cm}^3$$, dan kedua-duanya bertindak balas pada kadar yang sama",
        },
      ],
    },
  },
};

export default item;
