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
          label: "$$0.050\\text{ m}$$, $$2.0\\text{ J}$$ and $$1.2\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$0.10\\text{ m}$$, $$0.50\\text{ J}$$ and $$0.15\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$0.20\\text{ m}$$, $$0.25\\text{ J}$$ and $$0.15\\text{ m}$$",
        },
        {
          correct: true,
          label:
            "$$0.20\\text{ m}$$, $$0.50\\text{ J}$$ and $$0.075\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.050\\text{ m}$$, $$2.0\\text{ J}$$ dan $$1.2\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$0.10\\text{ m}$$, $$0.50\\text{ J}$$ dan $$0.15\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$0.20\\text{ m}$$, $$0.25\\text{ J}$$ dan $$0.15\\text{ m}$$",
        },
        {
          correct: true,
          label:
            "$$0.20\\text{ m}$$, $$0.50\\text{ J}$$ dan $$0.075\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
