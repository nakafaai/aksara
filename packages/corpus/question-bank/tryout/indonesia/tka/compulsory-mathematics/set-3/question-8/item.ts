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
          label: "Persamaan $$f(x)=x$$ memiliki dua solusi real.",
        },
        {
          correct: false,
          label: "$$f^{-1}=f$$.",
        },
      ],
    },
  },
};

export default item;
