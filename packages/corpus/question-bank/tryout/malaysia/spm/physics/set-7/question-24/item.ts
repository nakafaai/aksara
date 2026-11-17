import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.5\\times10^{5}\\text{ N}$$, $$19\\text{ kN}$$ and $$14\\text{ m}$$",
        },
        {
          correct: true,
          label:
            "$$1.0\\times10^{5}\\text{ N}$$, $$13\\text{ kN}$$ and $$24\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$1.0\\times10^{5}\\text{ N}$$, $$13\\text{ kN}$$ and $$34\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$2.0\\times10^{5}\\text{ N}$$, $$25\\text{ kN}$$ and $$12\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.5\\times10^{5}\\text{ N}$$, $$19\\text{ kN}$$ dan $$14\\text{ m}$$",
        },
        {
          correct: true,
          label:
            "$$1.0\\times10^{5}\\text{ N}$$, $$13\\text{ kN}$$ dan $$24\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$1.0\\times10^{5}\\text{ N}$$, $$13\\text{ kN}$$ dan $$34\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$2.0\\times10^{5}\\text{ N}$$, $$25\\text{ kN}$$ dan $$12\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
