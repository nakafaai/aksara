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
          column: 2,
          label: "Daerah hasil $$f$$ adalah himpunan semua bilangan real.",
        },
        {
          column: 1,
          label: "$$f^{-1}(x)=\\frac{x+2}{x-1}$$ untuk $$x\\ne1$$.",
        },
        {
          column: 1,
          label: "$$(f\\circ f)(5)=5$$",
        },
        {
          column: 2,
          label: "Persamaan $$f(x)=4$$ dipenuhi oleh $$x=3$$.",
        },
      ],
    },
  },
};

export default item;
