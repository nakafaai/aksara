import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Aluminium, $$20.0\\text{ cm}^3$$, $$60.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "Iron, $$20.0\\text{ cm}^3$$, $$30.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "Aluminium, $$10.0\\text{ cm}^3$$, $$30.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "Aluminium, $$20.0\\text{ cm}^3$$, $$30.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Aluminium, $$20.0\\text{ cm}^3$$, $$60.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "Ferum, $$20.0\\text{ cm}^3$$, $$30.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "Aluminium, $$10.0\\text{ cm}^3$$, $$30.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "Aluminium, $$20.0\\text{ cm}^3$$, $$30.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
