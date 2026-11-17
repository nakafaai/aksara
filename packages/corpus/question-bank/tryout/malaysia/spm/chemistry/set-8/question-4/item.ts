import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{XY}$$, $$1.18\\text{ g}$$, $$2.41\\times10^{22}$$",
        },
        {
          correct: false,
          label: "$$\\text{XY}_2$$, $$1.88\\text{ g}$$, $$1.20\\times10^{22}$$",
        },
        {
          correct: true,
          label: "$$\\text{XY}_2$$, $$1.88\\text{ g}$$, $$3.61\\times10^{22}$$",
        },
        {
          correct: false,
          label: "$$\\text{XY}_2$$, $$2.01\\text{ g}$$, $$3.94\\times10^{22}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{XY}$$, $$1.18\\text{ g}$$, $$2.41\\times10^{22}$$",
        },
        {
          correct: false,
          label: "$$\\text{XY}_2$$, $$1.88\\text{ g}$$, $$1.20\\times10^{22}$$",
        },
        {
          correct: true,
          label: "$$\\text{XY}_2$$, $$1.88\\text{ g}$$, $$3.61\\times10^{22}$$",
        },
        {
          correct: false,
          label: "$$\\text{XY}_2$$, $$2.01\\text{ g}$$, $$3.94\\times10^{22}$$",
        },
      ],
    },
  },
};

export default item;
