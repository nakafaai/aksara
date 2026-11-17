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
          label: "$$2.6\\times10^{5}\\text{ Pa}$$, floor $$6$$ and floor $$5$$",
        },
        {
          correct: false,
          label: "$$1.6\\times10^{5}\\text{ Pa}$$, floor $$7$$ and floor $$6$$",
        },
        {
          correct: false,
          label: "$$1.6\\times10^{5}\\text{ Pa}$$, floor $$6$$ and no floor",
        },
        {
          correct: true,
          label: "$$1.6\\times10^{5}\\text{ Pa}$$, floor $$6$$ and floor $$5$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.6\\times10^{5}\\text{ Pa}$$, tingkat $$6$$ dan tingkat $$5$$",
        },
        {
          correct: false,
          label:
            "$$1.6\\times10^{5}\\text{ Pa}$$, tingkat $$7$$ dan tingkat $$6$$",
        },
        {
          correct: false,
          label:
            "$$1.6\\times10^{5}\\text{ Pa}$$, tingkat $$6$$ dan tiada tingkat",
        },
        {
          correct: true,
          label:
            "$$1.6\\times10^{5}\\text{ Pa}$$, tingkat $$6$$ dan tingkat $$5$$",
        },
      ],
    },
  },
};

export default item;
