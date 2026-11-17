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
            "$$1.0\\times10^{5}\\text{ N}$$, $$13\\text{ kN}$$, $$24\\text{ m}$$ and $$24\\text{ m}$$",
        },
        {
          correct: true,
          label:
            "$$1.0\\times10^{5}\\text{ N}$$, $$13\\text{ kN}$$, $$24\\text{ m}$$ and $$14\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$1.5\\times10^{5}\\text{ N}$$, $$19\\text{ kN}$$, $$14\\text{ m}$$ and $$14\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$4.0\\times10^{5}\\text{ N}$$, $$50\\text{ kN}$$, $$6.0\\text{ m}$$ and no depth at all",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.0\\times10^{5}\\text{ N}$$, $$13\\text{ kN}$$, $$24\\text{ m}$$ dan $$24\\text{ m}$$",
        },
        {
          correct: true,
          label:
            "$$1.0\\times10^{5}\\text{ N}$$, $$13\\text{ kN}$$, $$24\\text{ m}$$ dan $$14\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$1.5\\times10^{5}\\text{ N}$$, $$19\\text{ kN}$$, $$14\\text{ m}$$ dan $$14\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$4.0\\times10^{5}\\text{ N}$$, $$50\\text{ kN}$$, $$6.0\\text{ m}$$ dan tiada kedalaman langsung",
        },
      ],
    },
  },
};

export default item;
