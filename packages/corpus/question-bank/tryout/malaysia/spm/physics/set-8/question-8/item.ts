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
          label: "$$580\\text{ N}$$, $$21\\%$$ and $$1.4\\text{ h}$$",
        },
        {
          correct: true,
          label: "$$380\\text{ N}$$, $$21\\%$$ and $$1.4\\text{ h}$$",
        },
        {
          correct: false,
          label: "$$480\\text{ N}$$, $$0\\%$$ and $$1.4\\text{ h}$$",
        },
        {
          correct: false,
          label: "$$380\\text{ N}$$, $$21\\%$$ and $$0.22\\text{ h}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$580\\text{ N}$$, $$21\\%$$ dan $$1.4\\text{ h}$$",
        },
        {
          correct: true,
          label: "$$380\\text{ N}$$, $$21\\%$$ dan $$1.4\\text{ h}$$",
        },
        {
          correct: false,
          label: "$$480\\text{ N}$$, $$0\\%$$ dan $$1.4\\text{ h}$$",
        },
        {
          correct: false,
          label: "$$380\\text{ N}$$, $$21\\%$$ dan $$0.22\\text{ h}$$",
        },
      ],
    },
  },
};

export default item;
