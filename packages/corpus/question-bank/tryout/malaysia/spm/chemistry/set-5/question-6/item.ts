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
          label: "$$40\\%$$, $$48\\text{ cm}^3$$, $$24\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$40\\%$$, $$48\\text{ cm}^3$$, $$60\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$20\\%$$, $$24\\text{ cm}^3$$, $$27\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$40\\%$$, $$48\\text{ cm}^3$$, $$12\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$40\\%$$, $$48\\text{ cm}^3$$, $$24\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$40\\%$$, $$48\\text{ cm}^3$$, $$60\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$20\\%$$, $$24\\text{ cm}^3$$, $$27\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$40\\%$$, $$48\\text{ cm}^3$$, $$12\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
