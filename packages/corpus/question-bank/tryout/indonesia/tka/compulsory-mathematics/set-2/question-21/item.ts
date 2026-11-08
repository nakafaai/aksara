import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "daily-temperature",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$32^\\circ\\text{C}$$",
        },
        {
          correct: true,
          label: "$$32{,}5^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "sekitar $$32{,}7^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "$$33^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "$$65^\\circ\\text{C}$$",
        },
      ],
    },
  },
};

export default item;
