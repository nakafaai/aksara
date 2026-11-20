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
          correct: false,
          label: "$$3.8\\text{ N}$$, $$0.050\\text{ s}$$ and $$13\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$4.4\\text{ N}$$, $$0.056\\text{ s}$$ and $$28\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$3.2\\text{ N}$$, $$0.045\\text{ s}$$ and $$11\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$4.4\\text{ N}$$, $$0.056\\text{ s}$$ and $$14\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.8\\text{ N}$$, $$0.050\\text{ s}$$ dan $$13\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$4.4\\text{ N}$$, $$0.056\\text{ s}$$ dan $$28\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$3.2\\text{ N}$$, $$0.045\\text{ s}$$ dan $$11\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$4.4\\text{ N}$$, $$0.056\\text{ s}$$ dan $$14\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
