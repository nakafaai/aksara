import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Titik puncaknya adalah $$(2,-1)$$.",
        },
        {
          correct: true,
          label: "Range fungsi adalah $$[-1,\\infty)$$.",
        },
        {
          correct: true,
          label: "Fungsi menurun pada $$(-\\infty,2]$$.",
        },
        {
          correct: false,
          label: "Fungsi satu-satu pada $$\\mathbb R$$.",
        },
        {
          correct: true,
          label:
            "Jika domain $$f$$ dibatasi menjadi $$[2,\\infty)$$, $$f^{-1}(y)=2+\\sqrt{y+1}$$.",
        },
      ],
    },
  },
};

export default item;
