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
          label: "$$1.00\\text{ g}$$ and $$0.030\\text{ mol}$$",
        },
        {
          correct: false,
          label: "$$1.14\\text{ g}$$ and $$0.060\\text{ mol}$$",
        },
        {
          correct: true,
          label: "$$1.00\\text{ g}$$ and $$0.060\\text{ mol}$$",
        },
        {
          correct: false,
          label: "$$3.00\\text{ g}$$ and $$0.18\\text{ mol}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.00\\text{ g}$$ dan $$0.030\\text{ mol}$$",
        },
        {
          correct: false,
          label: "$$1.14\\text{ g}$$ dan $$0.060\\text{ mol}$$",
        },
        {
          correct: true,
          label: "$$1.00\\text{ g}$$ dan $$0.060\\text{ mol}$$",
        },
        {
          correct: false,
          label: "$$3.00\\text{ g}$$ dan $$0.18\\text{ mol}$$",
        },
      ],
    },
  },
};

export default item;
