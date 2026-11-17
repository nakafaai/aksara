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
          correct: true,
          label:
            "$$0.15\\text{ m}$$ deeper, $$5.8\\times10^{5}\\text{ kg}$$ and $$1.8\\times10^{5}\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$0.15\\text{ m}$$ shallower, $$5.8\\times10^{5}\\text{ kg}$$ and $$0\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$0.15\\text{ m}$$ deeper, $$6.0\\times10^{5}\\text{ kg}$$ and $$1.8\\times10^{5}\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$0.15\\text{ m}$$ deeper, $$5.8\\times10^{5}\\text{ kg}$$ and $$1.9\\times10^{5}\\text{ kg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.15\\text{ m}$$ lebih dalam, $$5.8\\times10^{5}\\text{ kg}$$ dan $$1.8\\times10^{5}\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$0.15\\text{ m}$$ lebih cetek, $$5.8\\times10^{5}\\text{ kg}$$ dan $$0\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$0.15\\text{ m}$$ lebih dalam, $$6.0\\times10^{5}\\text{ kg}$$ dan $$1.8\\times10^{5}\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$0.15\\text{ m}$$ lebih dalam, $$5.8\\times10^{5}\\text{ kg}$$ dan $$1.9\\times10^{5}\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
