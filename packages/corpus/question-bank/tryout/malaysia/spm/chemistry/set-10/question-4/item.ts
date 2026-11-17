import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Calcium, $$600\\text{ cm}^3$$, $$20.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "Magnesium, $$600\\text{ cm}^3$$, $$20.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "Magnesium, $$600\\text{ cm}^3$$, $$70.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "Magnesium, $$600\\text{ cm}^3$$, $$120\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kalsium, $$600\\text{ cm}^3$$, $$20.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "Magnesium, $$600\\text{ cm}^3$$, $$20.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "Magnesium, $$600\\text{ cm}^3$$, $$70.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "Magnesium, $$600\\text{ cm}^3$$, $$120\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
