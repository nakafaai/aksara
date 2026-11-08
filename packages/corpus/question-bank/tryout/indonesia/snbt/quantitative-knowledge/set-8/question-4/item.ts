import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Grafik $$f$$ memotong sumbu $$x$$ di titik $$(3,0)$$.",
        },
        {
          column: 2,
          label: "Grafik $$f$$ memotong sumbu $$y$$ di titik $$(0,-3)$$.",
        },
        {
          column: 2,
          label: "Terdapat bilangan real $$x$$ yang memenuhi $$f(x)=-4$$.",
        },
        { column: 1, label: "$$f(5)=12$$" },
      ],
    },
  },
};

export default item;
