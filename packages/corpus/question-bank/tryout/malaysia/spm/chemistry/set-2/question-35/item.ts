import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$20.0^\\circ\\text{C}$$, $$10.0^\\circ\\text{C}$$, $$1.28\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$20.0^\\circ\\text{C}$$, $$20.0^\\circ\\text{C}$$, $$0.640\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$20.0^\\circ\\text{C}$$, $$5.00^\\circ\\text{C}$$, $$0.640\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$20.0^\\circ\\text{C}$$, $$5.00^\\circ\\text{C}$$, $$1.28\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$20.0^\\circ\\text{C}$$, $$10.0^\\circ\\text{C}$$, $$1.28\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$20.0^\\circ\\text{C}$$, $$20.0^\\circ\\text{C}$$, $$0.640\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$20.0^\\circ\\text{C}$$, $$5.00^\\circ\\text{C}$$, $$0.640\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$20.0^\\circ\\text{C}$$, $$5.00^\\circ\\text{C}$$, $$1.28\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
