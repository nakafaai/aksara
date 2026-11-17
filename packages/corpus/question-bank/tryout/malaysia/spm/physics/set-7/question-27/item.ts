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
            "$$0.15\\text{ m}$$ deeper and $$5.8\\times10^{5}\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$0.15\\text{ m}$$ shallower and $$5.8\\times10^{5}\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$0.15\\text{ m}$$ deeper and $$6.0\\times10^{5}\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$4.9\\text{ m}$$ deeper and $$5.8\\times10^{5}\\text{ kg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.15\\text{ m}$$ lebih dalam dan $$5.8\\times10^{5}\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$0.15\\text{ m}$$ lebih cetek dan $$5.8\\times10^{5}\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$0.15\\text{ m}$$ lebih dalam dan $$6.0\\times10^{5}\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$4.9\\text{ m}$$ lebih dalam dan $$5.8\\times10^{5}\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
