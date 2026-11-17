import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$5.35\\text{ g}$$, $$0\\text{ cm}^3$$, $$6.02\\times10^{22}$$ dative bonds",
        },
        {
          correct: false,
          label:
            "$$4.01\\text{ g}$$, $$600\\text{ cm}^3$$, $$1.81\\times10^{23}$$ dative bonds",
        },
        {
          correct: false,
          label: "$$4.01\\text{ g}$$, $$600\\text{ cm}^3$$, $$0$$ dative bonds",
        },
        {
          correct: true,
          label:
            "$$4.01\\text{ g}$$, $$600\\text{ cm}^3$$, $$4.52\\times10^{22}$$ dative bonds",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$5.35\\text{ g}$$, $$0\\text{ cm}^3$$, $$6.02\\times10^{22}$$ ikatan datif",
        },
        {
          correct: false,
          label:
            "$$4.01\\text{ g}$$, $$600\\text{ cm}^3$$, $$1.81\\times10^{23}$$ ikatan datif",
        },
        {
          correct: false,
          label: "$$4.01\\text{ g}$$, $$600\\text{ cm}^3$$, $$0$$ ikatan datif",
        },
        {
          correct: true,
          label:
            "$$4.01\\text{ g}$$, $$600\\text{ cm}^3$$, $$4.52\\times10^{22}$$ ikatan datif",
        },
      ],
    },
  },
};

export default item;
