import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$5.0\\text{ cm}$$, $$5.0\\text{ cm}$$ and $$0.25\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$2.0\\text{ cm}$$, $$5.0\\text{ cm}$$ and $$0.25\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$7.0\\text{ cm}$$, $$13\\text{ cm}$$ and $$1.7\\text{ J}$$",
        },
        {
          correct: true,
          label:
            "$$2.0\\text{ cm}$$, $$8.0\\text{ cm}$$ and $$0.64\\text{ J}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$5.0\\text{ cm}$$, $$5.0\\text{ cm}$$ dan $$0.25\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$2.0\\text{ cm}$$, $$5.0\\text{ cm}$$ dan $$0.25\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$7.0\\text{ cm}$$, $$13\\text{ cm}$$ dan $$1.7\\text{ J}$$",
        },
        {
          correct: true,
          label:
            "$$2.0\\text{ cm}$$, $$8.0\\text{ cm}$$ dan $$0.64\\text{ J}$$",
        },
      ],
    },
  },
};

export default item;
