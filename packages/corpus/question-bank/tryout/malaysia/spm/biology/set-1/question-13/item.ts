import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "transport-in-humans-and-animals",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$54\\text{ cm}^3$$, $$4.3$$ times",
        },
        {
          correct: true,
          label: "$$90\\text{ cm}^3$$, $$4.3$$ times",
        },
        {
          correct: false,
          label: "$$90\\text{ cm}^3$$, $$3.2$$ times",
        },
        {
          correct: false,
          label: "$$90\\text{ cm}^3$$, $$2.5$$ times",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$54\\text{ cm}^3$$, $$4.3$$ kali",
        },
        {
          correct: true,
          label: "$$90\\text{ cm}^3$$, $$4.3$$ kali",
        },
        {
          correct: false,
          label: "$$90\\text{ cm}^3$$, $$3.2$$ kali",
        },
        {
          correct: false,
          label: "$$90\\text{ cm}^3$$, $$2.5$$ kali",
        },
      ],
    },
  },
};

export default item;
