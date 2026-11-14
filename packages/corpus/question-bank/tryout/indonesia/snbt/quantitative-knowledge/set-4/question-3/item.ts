import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Persamaan $$f(x)=4$$ mempunyai tepat $$3$$ penyelesaian real.",
        },
        {
          column: 2,
          label:
            "Persamaan $$f(x)=x+2$$ mempunyai tepat $$2$$ penyelesaian real.",
        },
        {
          column: 1,
          label:
            "Persamaan $$f\\bigl(f(x)\\bigr)=2$$ mempunyai tepat $$8$$ penyelesaian real.",
        },
        {
          column: 1,
          label:
            "Ada tepat $$3$$ bilangan bulat $$k$$ sehingga persamaan $$f(x)=k$$ mempunyai tepat $$4$$ penyelesaian real.",
        },
      ],
    },
  },
};

export default item;
