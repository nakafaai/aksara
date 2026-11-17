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
        { correct: false, label: "$$0.050\\text{ m}$$ and $$2.0\\text{ J}$$" },
        { correct: false, label: "$$0.10\\text{ m}$$ and $$0.50\\text{ J}$$" },
        { correct: false, label: "$$0.20\\text{ m}$$ and $$0.25\\text{ J}$$" },
        { correct: true, label: "$$0.20\\text{ m}$$ and $$0.50\\text{ J}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.050\\text{ m}$$ dan $$2.0\\text{ J}$$" },
        { correct: false, label: "$$0.10\\text{ m}$$ dan $$0.50\\text{ J}$$" },
        { correct: false, label: "$$0.20\\text{ m}$$ dan $$0.25\\text{ J}$$" },
        { correct: true, label: "$$0.20\\text{ m}$$ dan $$0.50\\text{ J}$$" },
      ],
    },
  },
};

export default item;
