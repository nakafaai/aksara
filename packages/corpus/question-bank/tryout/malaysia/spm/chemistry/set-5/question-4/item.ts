import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$69.6\\%$$, $$1.48\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$30.4\\%$$, $$2.22\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$69.6\\%$$, $$2.22\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$28.3\\%$$, $$2.22\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$69.6\\%$$, $$1.48\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$30.4\\%$$, $$2.22\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$69.6\\%$$, $$2.22\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$28.3\\%$$, $$2.22\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
