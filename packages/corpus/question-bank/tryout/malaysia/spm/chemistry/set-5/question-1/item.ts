import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$9.05\\text{ g cm}^{-3} \\pm 8.3\\%$$, so the metal is copper",
        },
        {
          correct: true,
          label:
            "$$9.05\\text{ g cm}^{-3} \\pm 16.7\\%$$, so iron, copper and silver all fit",
        },
        {
          correct: false,
          label:
            "$$9.05\\text{ g cm}^{-3} \\pm 16.7\\%$$, so the metal is copper",
        },
        {
          correct: false,
          label:
            "$$1.75\\text{ g cm}^{-3} \\pm 3.2\\%$$, so none of the metals fit",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$9.05\\text{ g cm}^{-3} \\pm 8.3\\%$$, jadi logam itu ialah kuprum",
        },
        {
          correct: true,
          label:
            "$$9.05\\text{ g cm}^{-3} \\pm 16.7\\%$$, jadi besi, kuprum dan argentum semuanya sepadan",
        },
        {
          correct: false,
          label:
            "$$9.05\\text{ g cm}^{-3} \\pm 16.7\\%$$, jadi logam itu ialah kuprum",
        },
        {
          correct: false,
          label:
            "$$1.75\\text{ g cm}^{-3} \\pm 3.2\\%$$, jadi tiada logam yang sepadan",
        },
      ],
    },
  },
};

export default item;
