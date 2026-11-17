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
        { correct: false, label: "$$1.0\\text{ m}$$ and $$10\\text{ m}$$" },
        { correct: false, label: "$$1.1\\text{ m}$$ and $$20\\text{ m}$$" },
        { correct: true, label: "$$1.1\\text{ m}$$ and $$10\\text{ m}$$" },
        { correct: false, label: "$$1.1\\text{ m}$$ and $$5.0\\text{ m}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1.0\\text{ m}$$ dan $$10\\text{ m}$$" },
        { correct: false, label: "$$1.1\\text{ m}$$ dan $$20\\text{ m}$$" },
        { correct: true, label: "$$1.1\\text{ m}$$ dan $$10\\text{ m}$$" },
        { correct: false, label: "$$1.1\\text{ m}$$ dan $$5.0\\text{ m}$$" },
      ],
    },
  },
};

export default item;
