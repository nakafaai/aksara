import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Jika $$a=2$$, ada nilai $$b$$ yang membuat sistem tidak mempunyai penyelesaian.",
        },
        {
          column: 1,
          label:
            "Jika $$a=1$$ dan $$b=12$$, sistem mempunyai tak hingga banyak penyelesaian.",
        },
        {
          column: 2,
          label:
            "Jika $$a=3$$ dan $$b=6$$, penyelesaian sistem memenuhi $$x+y=1$$.",
        },
        {
          column: 1,
          label:
            "Jika $$a=1$$ dan $$b=10$$, sistem tidak mempunyai penyelesaian.",
        },
      ],
    },
  },
};

export default item;
