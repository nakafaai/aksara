import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.180\\text{ A}$$, $$4$$ and a lit bulb",
        },
        {
          correct: false,
          label: "$$0.167\\text{ A}$$, $$3$$ and a shunt",
        },
        {
          correct: false,
          label: "$$0.180\\text{ A}$$, $$3$$ and a lit bulb",
        },
        {
          correct: true,
          label: "$$0.180\\text{ A}$$, $$3$$ and a shunt",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.180\\text{ A}$$, $$4$$ dan mentol yang menyala",
        },
        {
          correct: false,
          label: "$$0.167\\text{ A}$$, $$3$$ dan pirau",
        },
        {
          correct: false,
          label: "$$0.180\\text{ A}$$, $$3$$ dan mentol yang menyala",
        },
        {
          correct: true,
          label: "$$0.180\\text{ A}$$, $$3$$ dan pirau",
        },
      ],
    },
  },
};

export default item;
