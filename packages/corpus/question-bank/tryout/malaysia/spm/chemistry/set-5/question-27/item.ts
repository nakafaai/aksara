import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$11.6\\text{ g}$$, $$0\\text{ g}$$, $$9$$ loaves",
        },
        {
          correct: false,
          label: "$$9.30\\text{ g}$$, $$5.55\\text{ g}$$, $$7$$ loaves",
        },
        {
          correct: false,
          label: "$$9.30\\text{ g}$$, $$1.85\\text{ g}$$, $$8$$ loaves",
        },
        {
          correct: true,
          label: "$$9.30\\text{ g}$$, $$1.85\\text{ g}$$, $$7$$ loaves",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$11.6\\text{ g}$$, $$0\\text{ g}$$, $$9$$ buku",
        },
        {
          correct: false,
          label: "$$9.30\\text{ g}$$, $$5.55\\text{ g}$$, $$7$$ buku",
        },
        {
          correct: false,
          label: "$$9.30\\text{ g}$$, $$1.85\\text{ g}$$, $$8$$ buku",
        },
        {
          correct: true,
          label: "$$9.30\\text{ g}$$, $$1.85\\text{ g}$$, $$7$$ buku",
        },
      ],
    },
  },
};

export default item;
