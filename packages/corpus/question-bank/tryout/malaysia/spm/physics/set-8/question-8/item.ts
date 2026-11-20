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
        {
          correct: false,
          label: "$$580\\text{ N}$$, $$1.8\\text{ s}$$ and $$1.4\\text{ h}$$",
        },
        {
          correct: true,
          label: "$$380\\text{ N}$$, $$2.2\\text{ s}$$ and $$1.4\\text{ h}$$",
        },
        {
          correct: false,
          label: "$$480\\text{ N}$$, $$2.0\\text{ s}$$ and $$1.4\\text{ h}$$",
        },
        {
          correct: false,
          label: "$$380\\text{ N}$$, $$2.2\\text{ s}$$ and $$0.22\\text{ h}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$580\\text{ N}$$, $$1.8\\text{ s}$$ dan $$1.4\\text{ h}$$",
        },
        {
          correct: true,
          label: "$$380\\text{ N}$$, $$2.2\\text{ s}$$ dan $$1.4\\text{ h}$$",
        },
        {
          correct: false,
          label: "$$480\\text{ N}$$, $$2.0\\text{ s}$$ dan $$1.4\\text{ h}$$",
        },
        {
          correct: false,
          label: "$$380\\text{ N}$$, $$2.2\\text{ s}$$ dan $$0.22\\text{ h}$$",
        },
      ],
    },
  },
};

export default item;
