import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Persamaan $$f(x)=2$$ mempunyai dua penyelesaian real.",
        },
        { column: 1, label: "$$f(x)\\ge2$$ untuk setiap bilangan real $$x$$." },
        { column: 1, label: "$$f(2)=\\bigl(f(1)\\bigr)^2-2$$" },
        {
          column: 2,
          label: "$$f(x+1)=2f(x)$$ untuk setiap bilangan real $$x$$.",
        },
      ],
    },
  },
};

export default item;
