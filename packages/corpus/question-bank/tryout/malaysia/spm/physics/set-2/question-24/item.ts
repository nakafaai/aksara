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
          label: "$$600\\text{ kg m}^{-3}$$; $$1.2\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$600\\text{ kg m}^{-3}$$; $$0.60\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$1600\\text{ kg m}^{-3}$$; $$1.6\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$600\\text{ kg m}^{-3}$$; $$0.75\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$600\\text{ kg m}^{-3}$$; $$1.2\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$600\\text{ kg m}^{-3}$$; $$0.60\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$1600\\text{ kg m}^{-3}$$; $$1.6\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$600\\text{ kg m}^{-3}$$; $$0.75\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
