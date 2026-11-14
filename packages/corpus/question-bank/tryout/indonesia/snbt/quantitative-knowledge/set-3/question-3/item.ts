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
            "Persamaan $$x^2-4\\lfloor x\\rfloor+3=0$$ mempunyai tepat $$3$$ penyelesaian real.",
        },
        {
          column: 2,
          label:
            "Persamaan $$\\lfloor x\\rfloor+\\lfloor 2x\\rfloor=10$$ tidak mempunyai penyelesaian real.",
        },
        {
          column: 1,
          label:
            "Untuk setiap bilangan real $$x$$ berlaku $$\\lfloor x\\rfloor+\\left\\lfloor x+\\tfrac{1}{2}\\right\\rfloor=\\lfloor 2x\\rfloor$$.",
        },
        {
          column: 1,
          label:
            "Himpunan penyelesaian $$\\lfloor x\\rfloor^2-\\lfloor x\\rfloor-6<0$$ adalah $$-1\\le x<3$$.",
        },
      ],
    },
  },
};

export default item;
