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
            "$$833\\text{ kg m}^{-3}$$, $$10.0\\text{ cm}$$ and $$13.7\\text{ cm}$$",
        },
        {
          correct: true,
          label:
            "$$833\\text{ kg m}^{-3}$$, $$5.0\\text{ cm}$$ and $$13.7\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$833\\text{ kg m}^{-3}$$, $$5.0\\text{ cm}$$ and $$19.2\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$1.2\\times10^{3}\\text{ kg m}^{-3}$$, $$5.0\\text{ cm}$$ and $$13.3\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$833\\text{ kg m}^{-3}$$, $$10.0\\text{ cm}$$ dan $$13.7\\text{ cm}$$",
        },
        {
          correct: true,
          label:
            "$$833\\text{ kg m}^{-3}$$, $$5.0\\text{ cm}$$ dan $$13.7\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$833\\text{ kg m}^{-3}$$, $$5.0\\text{ cm}$$ dan $$19.2\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$1.2\\times10^{3}\\text{ kg m}^{-3}$$, $$5.0\\text{ cm}$$ dan $$13.3\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
