import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1.25\\text{ km}$$, once every $$50\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$0.63\\text{ km}$$, once every $$25\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$50\\text{ m}$$, once every $$2.0\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$80\\text{ km}$$, once every $$53$$ minutes",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1.25\\text{ km}$$, sekali setiap $$50\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$0.63\\text{ km}$$, sekali setiap $$25\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$50\\text{ m}$$, sekali setiap $$2.0\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$80\\text{ km}$$, sekali setiap $$53$$ minit",
        },
      ],
    },
  },
};

export default item;
