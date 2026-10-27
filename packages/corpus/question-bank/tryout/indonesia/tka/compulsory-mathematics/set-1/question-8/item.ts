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
          label: "Titik potong kedua asimtot adalah $$(1,2)$$.",
        },
        {
          correct: true,
          label: "$$f$$ menurun ketat pada setiap interval domainnya.",
        },
        {
          correct: true,
          label: "Jika $$x>1$$, maka $$f(x)>2$$.",
        },
        {
          correct: true,
          label: "$$f^{-1}(x)=\\frac{x+3}{x-2}$$.",
        },
        {
          correct: false,
          label: "$$f(1)=0$$.",
        },
      ],
    },
  },
};

export default item;
