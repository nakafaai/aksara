import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$56.0\\text{ kJ}$$, $$0.14$$ hours, $$2.88\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$5.60\\text{ MJ}$$, $$14$$ hours, $$0.48\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$5.60\\text{ MJ}$$, $$14$$ hours, $$2.88\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$0.560\\text{ MJ}$$, $$1.4$$ hours, $$2.88\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$56.0\\text{ kJ}$$, $$0.14$$ jam, $$2.88\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$5.60\\text{ MJ}$$, $$14$$ jam, $$0.48\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$5.60\\text{ MJ}$$, $$14$$ jam, $$2.88\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$0.560\\text{ MJ}$$, $$1.4$$ jam, $$2.88\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
