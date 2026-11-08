import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "$$f(4)=9$$" },
        { column: 2, label: "$$f(0)=\\dfrac13$$" },
        { column: 2, label: "$$f^{-1}(5)=2$$" },
        {
          column: 1,
          label: "Tidak ada bilangan real $$x$$ yang memenuhi $$f(x)=2$$.",
        },
      ],
    },
  },
};

export default item;
