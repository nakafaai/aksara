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
          label: "Titik potong kedua asimtot adalah $$(1,2)$$.",
        },
        {
          isCorrect: true,
          label: "$$f$$ menurun ketat pada setiap interval domainnya.",
        },
        {
          isCorrect: true,
          label: "Jika $$x>1$$, maka $$f(x)>2$$.",
        },
        {
          isCorrect: true,
          label: "Persamaan $$f(x)=x$$ memiliki dua solusi real.",
        },
        {
          isCorrect: false,
          label: "$$f^{-1}=f$$.",
        },
      ],
    },
  },
};

export default item;
