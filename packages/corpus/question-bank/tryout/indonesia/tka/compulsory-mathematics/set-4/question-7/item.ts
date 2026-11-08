import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1{.}067^\\circ\\text{F}$$",
        },
        {
          correct: false,
          label: "$$575{,}6^\\circ\\text{F}$$",
        },
        {
          correct: false,
          label: "$$357{,}2^\\circ\\text{F}$$",
        },
        {
          correct: false,
          label: "$$109{,}8^\\circ\\text{F}$$",
        },
        {
          correct: true,
          label: "$$84{,}2^\\circ\\text{F}$$",
        },
      ],
    },
  },
};

export default item;
