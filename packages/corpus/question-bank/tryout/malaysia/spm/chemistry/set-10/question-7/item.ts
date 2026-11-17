import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$x=2$$, $$2.33\\text{ g}$$, $$200\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$x=2$$, $$2.33\\text{ g}$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$x=2$$, $$2.73\\text{ g}$$, $$235\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$x=2$$, $$2.08\\text{ g}$$, $$200\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$x=2$$, $$2.33\\text{ g}$$, $$200\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$x=2$$, $$2.33\\text{ g}$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$x=2$$, $$2.73\\text{ g}$$, $$235\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$x=2$$, $$2.08\\text{ g}$$, $$200\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
