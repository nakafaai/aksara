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
            "Sisa pembagian $$\\left(P(x)\\right)^2$$ oleh $$(x-1)(x-2)$$ adalah $$16x-7$$.",
        },
        { column: 2, label: "Nilai $$P(3)$$ pasti sama dengan $$7$$." },
        {
          column: 1,
          label: "Sisa pembagian $$P(x+1)$$ oleh $$x^2-x$$ adalah $$2x+3$$.",
        },
        {
          column: 1,
          label:
            "Ada suku banyak $$P(x)$$ berderajat $$3$$ yang memenuhi kedua keterangan dan $$P(3)=0$$.",
        },
      ],
    },
  },
};

export default item;
