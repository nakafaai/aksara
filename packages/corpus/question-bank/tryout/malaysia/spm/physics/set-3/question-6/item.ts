import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$1.2\\text{ m}$$, and it passes its start $$1.7\\text{ s}$$ after release",
        },
        {
          correct: false,
          label:
            "$$1.0\\text{ m}$$, and it passes its start $$1.4\\text{ s}$$ after release",
        },
        {
          correct: false,
          label:
            "$$1.2\\text{ m}$$, and it passes its start $$1.5\\text{ s}$$ after release",
        },
        {
          correct: false,
          label:
            "$$1.2\\text{ m}$$, and it passes its start $$1.2\\text{ s}$$ after release",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$1.2\\text{ m}$$, dan ia melepasi kedudukan asalnya $$1.7\\text{ s}$$ selepas dilepaskan",
        },
        {
          correct: false,
          label:
            "$$1.0\\text{ m}$$, dan ia melepasi kedudukan asalnya $$1.4\\text{ s}$$ selepas dilepaskan",
        },
        {
          correct: false,
          label:
            "$$1.2\\text{ m}$$, dan ia melepasi kedudukan asalnya $$1.5\\text{ s}$$ selepas dilepaskan",
        },
        {
          correct: false,
          label:
            "$$1.2\\text{ m}$$, dan ia melepasi kedudukan asalnya $$1.2\\text{ s}$$ selepas dilepaskan",
        },
      ],
    },
  },
};

export default item;
