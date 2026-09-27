import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  responses: {
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Titik puncaknya adalah $$(2,-1)$$.",
        },
        {
          isCorrect: true,
          label: "Range fungsi adalah $$[-1,\\infty)$$.",
        },
        {
          isCorrect: true,
          label: "Fungsi menurun pada $$(-\\infty,2]$$.",
        },
        {
          isCorrect: false,
          label: "Fungsi satu-satu pada $$\\mathbb R$$.",
        },
        {
          isCorrect: true,
          label:
            "Jika domain $$f$$ dibatasi menjadi $$[2,\\infty)$$, $$f^{-1}(y)=2+\\sqrt{y+1}$$.",
        },
      ],
    },
  },
};

export default item;
