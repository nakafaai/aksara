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
            "Jika $$a=1$$ dan $$b=12$$, sistem itu memiliki tak hingga banyak penyelesaian.",
        },
        {
          column: 2,
          label:
            "Jika $$a=1$$ dan $$b=10$$, sistem itu memiliki tepat satu penyelesaian.",
        },
        {
          column: 2,
          label:
            "Jika $$a=2$$ dan $$b=12$$, penyelesaian sistem itu adalah $$x=2$$ dan $$y=0$$.",
        },
        {
          column: 1,
          label:
            "Jika $$a=2$$ dan $$b=12$$, sistem itu memiliki tepat satu penyelesaian.",
        },
      ],
    },
  },
};

export default item;
