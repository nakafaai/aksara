import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Critical angle $$42^\\circ$$, and the largest angle of entry is $$48^\\circ$$",
        },
        {
          correct: false,
          label:
            "Critical angle $$69^\\circ$$, and the largest angle of entry is $$21^\\circ$$",
        },
        {
          correct: false,
          label:
            "Critical angle $$21^\\circ$$, and the largest angle of entry is $$33^\\circ$$",
        },
        {
          correct: true,
          label:
            "Critical angle $$69^\\circ$$, and the largest angle of entry is $$33^\\circ$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sudut genting $$42^\\circ$$, dan sudut masuk terbesar ialah $$48^\\circ$$",
        },
        {
          correct: false,
          label:
            "Sudut genting $$69^\\circ$$, dan sudut masuk terbesar ialah $$21^\\circ$$",
        },
        {
          correct: false,
          label:
            "Sudut genting $$21^\\circ$$, dan sudut masuk terbesar ialah $$33^\\circ$$",
        },
        {
          correct: true,
          label:
            "Sudut genting $$69^\\circ$$, dan sudut masuk terbesar ialah $$33^\\circ$$",
        },
      ],
    },
  },
};

export default item;
