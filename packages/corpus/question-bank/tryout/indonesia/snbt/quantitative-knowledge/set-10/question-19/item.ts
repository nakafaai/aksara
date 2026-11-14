import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Nilai maksimum $$3x+4y$$ pada daerah $$D$$ adalah $$24$$.",
        },
        {
          column: 2,
          label:
            "Jika $$x$$ dan $$y$$ harus bilangan cacah, nilai maksimum $$3x+4y$$ pada daerah $$D$$ adalah $$23$$.",
        },
        {
          column: 2,
          label:
            "Nilai maksimum $$2x+y$$ pada daerah $$D$$ hanya tercapai di satu titik.",
        },
        {
          column: 2,
          label:
            "Jika pertidaksamaan $$x+3y\\le 14$$ diganti dengan $$x+3y\\le 17$$, nilai maksimum $$3x+4y$$ pada daerah yang baru naik sebesar $$4$$.",
        },
      ],
    },
  },
};

export default item;
