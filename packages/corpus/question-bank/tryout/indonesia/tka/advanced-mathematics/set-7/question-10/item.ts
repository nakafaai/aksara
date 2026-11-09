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
          label: "$$f(8)-f(2)=f(4)$$",
        },
        {
          column: 2,
          label: "$$f(x+y)=f(x)+f(y)$$ untuk setiap $$x>0$$ dan $$y>0$$.",
        },
        {
          column: 2,
          label: "$$f\\left(\\frac14\\right)=2$$",
        },
        {
          column: 1,
          label: "$$f\\left(x^2\\right)=2f(x)$$ untuk setiap $$x>0$$.",
        },
      ],
    },
  },
};

export default item;
