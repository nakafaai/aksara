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
          label: "II: $$13.0^\\circ\\text{C}$$, III: $$13.0^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "II: $$13.0^\\circ\\text{C}$$, III: $$6.5^\\circ\\text{C}$$",
        },
        {
          correct: true,
          label: "II: $$6.5^\\circ\\text{C}$$, III: $$13.0^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "II: $$6.5^\\circ\\text{C}$$, III: $$6.5^\\circ\\text{C}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "II: $$13.0^\\circ\\text{C}$$, III: $$13.0^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "II: $$13.0^\\circ\\text{C}$$, III: $$6.5^\\circ\\text{C}$$",
        },
        {
          correct: true,
          label: "II: $$6.5^\\circ\\text{C}$$, III: $$13.0^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "II: $$6.5^\\circ\\text{C}$$, III: $$6.5^\\circ\\text{C}$$",
        },
      ],
    },
  },
};

export default item;
