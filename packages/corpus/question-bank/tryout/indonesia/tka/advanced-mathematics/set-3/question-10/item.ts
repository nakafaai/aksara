import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "$$f(2)+f(0)=\\frac{10}{3}$$",
        },
        {
          column: 1,
          label: "$$f^{-1}(x)=1+{}^{3}\\log x$$ untuk $$x>0$$.",
        },
        {
          column: 2,
          label: "$$f(x+1)=3f(x)$$ hanya berlaku untuk $$x>0$$.",
        },
        {
          column: 2,
          label: "$$f^{-1}\\left(\\frac19\\right)=-2$$",
        },
      ],
    },
  },
};

export default item;
