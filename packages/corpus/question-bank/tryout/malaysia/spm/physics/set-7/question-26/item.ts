import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.6\\times10^{5}\\text{ Pa}$$ and floor $$6$$",
        },
        {
          correct: false,
          label: "$$1.6\\times10^{5}\\text{ Pa}$$ and floor $$7$$",
        },
        {
          correct: false,
          label: "$$9.0\\times10^{4}\\text{ Pa}$$ and floor $$6$$",
        },
        {
          correct: true,
          label: "$$1.6\\times10^{5}\\text{ Pa}$$ and floor $$6$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.6\\times10^{5}\\text{ Pa}$$ dan tingkat $$6$$",
        },
        {
          correct: false,
          label: "$$1.6\\times10^{5}\\text{ Pa}$$ dan tingkat $$7$$",
        },
        {
          correct: false,
          label: "$$9.0\\times10^{4}\\text{ Pa}$$ dan tingkat $$6$$",
        },
        {
          correct: true,
          label: "$$1.6\\times10^{5}\\text{ Pa}$$ dan tingkat $$6$$",
        },
      ],
    },
  },
};

export default item;
