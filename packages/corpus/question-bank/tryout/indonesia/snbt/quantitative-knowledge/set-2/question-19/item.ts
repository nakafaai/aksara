import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Setiap penyelesaian pertidaksamaan itu memenuhi $$x>1$$.",
        },
        {
          column: 1,
          label:
            "Banyak bilangan bulat $$x$$ yang memenuhi pertidaksamaan itu adalah $$9$$.",
        },
        {
          column: 2,
          label:
            "Setiap $$x$$ yang memenuhi pertidaksamaan itu juga memenuhi $$\\sqrt{x+3}>3-x$$.",
        },
        {
          column: 1,
          label: "Ada penyelesaian pertidaksamaan itu yang memenuhi $$x-3>2$$.",
        },
      ],
    },
  },
};

export default item;
