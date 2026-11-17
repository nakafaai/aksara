import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "About $$40^\\circ\\text{C}$$, and $$36\\text{ mA}$$",
        },
        {
          correct: false,
          label: "About $$40^\\circ\\text{C}$$, and $$106\\text{ mA}$$",
        },
        {
          correct: false,
          label: "About $$40^\\circ\\text{C}$$, and $$70\\text{ mA}$$",
        },
        {
          correct: false,
          label: "About $$40^\\circ\\text{C}$$, and $$0.36\\text{ mA}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Kira-kira $$40^\\circ\\text{C}$$, dan $$36\\text{ mA}$$",
        },
        {
          correct: false,
          label: "Kira-kira $$40^\\circ\\text{C}$$, dan $$106\\text{ mA}$$",
        },
        {
          correct: false,
          label: "Kira-kira $$40^\\circ\\text{C}$$, dan $$70\\text{ mA}$$",
        },
        {
          correct: false,
          label: "Kira-kira $$40^\\circ\\text{C}$$, dan $$0.36\\text{ mA}$$",
        },
      ],
    },
  },
};

export default item;
