import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Luas bidang diagonal $$ACGE$$ adalah $$72\\text{ cm}^2$$.",
        },
        {
          column: 1,
          label:
            "Panjang diagonal ruang $$AG$$ adalah $$6\\sqrt3\\text{ cm}$$.",
        },
        {
          column: 2,
          label:
            "Besar sudut antara garis $$AG$$ dan bidang $$ABCD$$ adalah $$45^\\circ$$.",
        },
        {
          column: 1,
          label:
            "Jarak titik $$A$$ ke bidang $$BDE$$ adalah $$2\\sqrt3\\text{ cm}$$.",
        },
      ],
    },
  },
};

export default item;
