import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$3.34\\times10^5\\text{ J kg}^{-1}$$; $$2100\\text{ J kg}^{-1}\\,^\\circ\\text{C}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$6.68\\times10^5\\text{ J kg}^{-1}$$; $$2100\\text{ J kg}^{-1}\\,^\\circ\\text{C}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$3.34\\times10^5\\text{ J kg}^{-1}$$; $$8400\\text{ J kg}^{-1}\\,^\\circ\\text{C}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$1.67\\times10^5\\text{ J kg}^{-1}$$; $$1050\\text{ J kg}^{-1}\\,^\\circ\\text{C}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$3.34\\times10^5\\text{ J kg}^{-1}$$; $$2100\\text{ J kg}^{-1}\\,^\\circ\\text{C}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$6.68\\times10^5\\text{ J kg}^{-1}$$; $$2100\\text{ J kg}^{-1}\\,^\\circ\\text{C}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$3.34\\times10^5\\text{ J kg}^{-1}$$; $$8400\\text{ J kg}^{-1}\\,^\\circ\\text{C}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$1.67\\times10^5\\text{ J kg}^{-1}$$; $$1050\\text{ J kg}^{-1}\\,^\\circ\\text{C}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
