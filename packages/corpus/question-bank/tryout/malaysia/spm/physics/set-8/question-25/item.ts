import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.0\\text{ m}$$, $$2500\\text{ N}$$ and $$1900\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$4.3\\text{ m}$$, $$4000\\text{ N}$$ and $$3400\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$4.3\\text{ m}$$, $$2500\\text{ N}$$ and $$3100\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$4.3\\text{ m}$$, $$2500\\text{ N}$$ and $$1900\\text{ N}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.0\\text{ m}$$, $$2500\\text{ N}$$ dan $$1900\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$4.3\\text{ m}$$, $$4000\\text{ N}$$ dan $$3400\\text{ N}$$",
        },
        {
          correct: false,
          label: "$$4.3\\text{ m}$$, $$2500\\text{ N}$$ dan $$3100\\text{ N}$$",
        },
        {
          correct: true,
          label: "$$4.3\\text{ m}$$, $$2500\\text{ N}$$ dan $$1900\\text{ N}$$",
        },
      ],
    },
  },
};

export default item;
