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
          label:
            "$$1.70\\text{ g}$$, $$2.41\\times10^{23}$$, $$\\tfrac{2}{7}$$",
        },
        {
          correct: false,
          label:
            "$$3.40\\text{ g}$$, $$4.33\\times10^{23}$$, $$\\tfrac{1}{3}$$",
        },
        {
          correct: true,
          label:
            "$$1.70\\text{ g}$$, $$2.17\\times10^{23}$$, $$\\tfrac{1}{3}$$",
        },
        {
          correct: false,
          label:
            "$$1.70\\text{ g}$$, $$2.17\\times10^{23}$$, $$\\tfrac{7}{16}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.70\\text{ g}$$, $$2.41\\times10^{23}$$, $$\\tfrac{2}{7}$$",
        },
        {
          correct: false,
          label:
            "$$3.40\\text{ g}$$, $$4.33\\times10^{23}$$, $$\\tfrac{1}{3}$$",
        },
        {
          correct: true,
          label:
            "$$1.70\\text{ g}$$, $$2.17\\times10^{23}$$, $$\\tfrac{1}{3}$$",
        },
        {
          correct: false,
          label:
            "$$1.70\\text{ g}$$, $$2.17\\times10^{23}$$, $$\\tfrac{7}{16}$$",
        },
      ],
    },
  },
};

export default item;
