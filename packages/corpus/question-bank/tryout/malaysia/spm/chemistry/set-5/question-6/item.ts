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
          correct: true,
          label: "$$84\\text{ cm}^3$$, then $$48\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$60\\text{ cm}^3$$, then $$36\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$84\\text{ cm}^3$$, then $$60\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$96\\text{ cm}^3$$, then $$72\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$84\\text{ cm}^3$$, kemudian $$48\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$60\\text{ cm}^3$$, kemudian $$36\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$84\\text{ cm}^3$$, kemudian $$60\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$96\\text{ cm}^3$$, kemudian $$72\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
