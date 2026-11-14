import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Daerah asal $$g$$ adalah interval $$[-3,3]$$.",
        },
        {
          column: 1,
          label: "Daerah hasil $$g$$ adalah interval $$[-3,13]$$.",
        },
        {
          column: 1,
          label:
            "Persamaan $$g(x)=7$$ mempunyai tepat $$2$$ penyelesaian real.",
        },
        {
          column: 2,
          label:
            "Persamaan $$g(x)=4$$ mempunyai tepat $$2$$ penyelesaian real.",
        },
      ],
    },
  },
};

export default item;
