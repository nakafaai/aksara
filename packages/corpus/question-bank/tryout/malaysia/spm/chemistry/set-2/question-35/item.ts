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
            "$$20.0^\\circ\\text{C}$$, $$10.0^\\circ\\text{C}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$20.0^\\circ\\text{C}$$, $$5.00^\\circ\\text{C}$$, $$10.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$20.0^\\circ\\text{C}$$, $$5.00^\\circ\\text{C}$$, $$20.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$20.0^\\circ\\text{C}$$, $$5.00^\\circ\\text{C}$$, $$40.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$20.0^\\circ\\text{C}$$, $$10.0^\\circ\\text{C}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$20.0^\\circ\\text{C}$$, $$5.00^\\circ\\text{C}$$, $$10.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$20.0^\\circ\\text{C}$$, $$5.00^\\circ\\text{C}$$, $$20.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$20.0^\\circ\\text{C}$$, $$5.00^\\circ\\text{C}$$, $$40.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
