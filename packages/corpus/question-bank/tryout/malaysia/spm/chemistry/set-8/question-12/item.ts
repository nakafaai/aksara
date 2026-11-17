import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{XY}_4$$, $$720\\text{ cm}^3$$, $$0.760\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$\\text{XY}_3$$, $$960\\text{ cm}^3$$, $$1.01\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$\\text{XY}_4$$, $$960\\text{ cm}^3$$, $$1.01\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$\\text{XY}_4$$, $$540\\text{ cm}^3$$, $$0.570\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{XY}_4$$, $$720\\text{ cm}^3$$, $$0.760\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$\\text{XY}_3$$, $$960\\text{ cm}^3$$, $$1.01\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$\\text{XY}_4$$, $$960\\text{ cm}^3$$, $$1.01\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$\\text{XY}_4$$, $$540\\text{ cm}^3$$, $$0.570\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
