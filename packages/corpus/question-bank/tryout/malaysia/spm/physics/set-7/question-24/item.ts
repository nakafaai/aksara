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
          label:
            "$$2.0\\times10^{5}\\text{ Pa}$$ and $$1.0\\times10^{5}\\text{ N}$$",
        },
        {
          correct: true,
          label:
            "$$3.0\\times10^{5}\\text{ Pa}$$ and $$1.0\\times10^{5}\\text{ N}$$",
        },
        {
          correct: false,
          label:
            "$$3.0\\times10^{5}\\text{ Pa}$$ and $$1.5\\times10^{5}\\text{ N}$$",
        },
        {
          correct: false,
          label:
            "$$3.0\\times10^{5}\\text{ Pa}$$ and $$6.0\\times10^{5}\\text{ N}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.0\\times10^{5}\\text{ Pa}$$ dan $$1.0\\times10^{5}\\text{ N}$$",
        },
        {
          correct: true,
          label:
            "$$3.0\\times10^{5}\\text{ Pa}$$ dan $$1.0\\times10^{5}\\text{ N}$$",
        },
        {
          correct: false,
          label:
            "$$3.0\\times10^{5}\\text{ Pa}$$ dan $$1.5\\times10^{5}\\text{ N}$$",
        },
        {
          correct: false,
          label:
            "$$3.0\\times10^{5}\\text{ Pa}$$ dan $$6.0\\times10^{5}\\text{ N}$$",
        },
      ],
    },
  },
};

export default item;
