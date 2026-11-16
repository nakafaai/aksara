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
          correct: true,
          label: "$$11.5\\text{ kJ}$$, $$4.03\\text{ g}$$ of iron left",
        },
        {
          correct: false,
          label: "$$41.2\\text{ kJ}$$, $$0\\text{ g}$$ of iron left",
        },
        {
          correct: false,
          label: "$$11.5\\text{ kJ}$$, $$1.57\\text{ g}$$ of iron left",
        },
        {
          correct: false,
          label: "$$34.6\\text{ kJ}$$, $$4.03\\text{ g}$$ of iron left",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$11.5\\text{ kJ}$$, $$4.03\\text{ g}$$ ferum berbaki",
        },
        {
          correct: false,
          label: "$$41.2\\text{ kJ}$$, $$0\\text{ g}$$ ferum berbaki",
        },
        {
          correct: false,
          label: "$$11.5\\text{ kJ}$$, $$1.57\\text{ g}$$ ferum berbaki",
        },
        {
          correct: false,
          label: "$$34.6\\text{ kJ}$$, $$4.03\\text{ g}$$ ferum berbaki",
        },
      ],
    },
  },
};

export default item;
