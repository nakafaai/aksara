import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Terdapat bilangan real $$x$$ yang memenuhi $$f(x)=2$$.",
        },
        { column: 1, label: "$$a=2$$" },
        { column: 1, label: "$$f^{-1}(x)=f(x)$$ untuk setiap $$x\\ne2$$." },
        { column: 1, label: "$$(f\\circ f)(5)=5$$" },
      ],
    },
  },
};

export default item;
