import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "support-and-movement-in-humans-and-animals",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$29\\%$$, the circular muscles",
        },
        {
          correct: false,
          label: "$$50\\%$$, the circular muscles",
        },
        {
          correct: false,
          label: "$$29\\%$$, the longitudinal muscles",
        },
        {
          correct: false,
          label: "$$75\\%$$, the circular muscles",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$29\\%$$, otot membulat",
        },
        {
          correct: false,
          label: "$$50\\%$$, otot membulat",
        },
        {
          correct: false,
          label: "$$29\\%$$, otot memanjang",
        },
        {
          correct: false,
          label: "$$75\\%$$, otot membulat",
        },
      ],
    },
  },
};

export default item;
