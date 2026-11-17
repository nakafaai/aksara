import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$2.47\\text{ g}$$, $$1.59\\text{ g}$$, $$4.99\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$2.96\\text{ g}$$, $$1.91\\text{ g}$$, $$5.99\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$2.47\\text{ g}$$, $$1.59\\text{ g}$$, $$3.19\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$2.47\\text{ g}$$, $$1.27\\text{ g}$$, $$4.99\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$2.47\\text{ g}$$, $$1.59\\text{ g}$$, $$4.99\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$2.96\\text{ g}$$, $$1.91\\text{ g}$$, $$5.99\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$2.47\\text{ g}$$, $$1.59\\text{ g}$$, $$3.19\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$2.47\\text{ g}$$, $$1.27\\text{ g}$$, $$4.99\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
