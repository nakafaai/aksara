import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "gravitation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$103\\text{ N}$$, and $$1.5$$ hours" },
        { correct: false, label: "$$240\\text{ N}$$, and $$1.5$$ hours" },
        { correct: false, label: "$$137\\text{ N}$$, and $$1.5$$ hours" },
        { correct: false, label: "$$103\\text{ N}$$, and $$0.24$$ hours" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$103\\text{ N}$$, dan $$1.5$$ jam" },
        { correct: false, label: "$$240\\text{ N}$$, dan $$1.5$$ jam" },
        { correct: false, label: "$$137\\text{ N}$$, dan $$1.5$$ jam" },
        { correct: false, label: "$$103\\text{ N}$$, dan $$0.24$$ jam" },
      ],
    },
  },
};

export default item;
