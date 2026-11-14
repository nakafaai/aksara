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
            "Banyak bilangan bulat yang memenuhi pertidaksamaan itu adalah $$7$$.",
        },
        {
          column: 2,
          label:
            "Setiap bilangan real yang memenuhi pertidaksamaan itu juga memenuhi $$\\lvert x+2\\rvert<3$$.",
        },
        {
          column: 2,
          label:
            "Untuk setiap bilangan real $$x$$, berlaku $$\\lvert x-4\\rvert-\\lvert 2x+1\\rvert\\le4$$.",
        },
        {
          column: 1,
          label:
            "Untuk setiap pasangan bilangan real $$a$$ dan $$b$$, pertidaksamaan $$\\lvert x-a\\rvert\\ge\\lvert 2x+b\\rvert$$ mempunyai paling sedikit satu penyelesaian real.",
        },
      ],
    },
  },
};

export default item;
