import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1120\\text{ kg}$$, $$400\\text{ kg}$$, $$6.72\\times10^5\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$448\\text{ kg}$$, $$400\\text{ kg}$$, $$6.72\\times10^5\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$896\\text{ kg}$$, $$400\\text{ kg}$$, $$5.76\\times10^5\\text{ dm}^3$$",
        },
        {
          correct: true,
          label:
            "$$896\\text{ kg}$$, $$400\\text{ kg}$$, $$6.72\\times10^5\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1120\\text{ kg}$$, $$400\\text{ kg}$$, $$6.72\\times10^5\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$448\\text{ kg}$$, $$400\\text{ kg}$$, $$6.72\\times10^5\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$896\\text{ kg}$$, $$400\\text{ kg}$$, $$5.76\\times10^5\\text{ dm}^3$$",
        },
        {
          correct: true,
          label:
            "$$896\\text{ kg}$$, $$400\\text{ kg}$$, $$6.72\\times10^5\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
