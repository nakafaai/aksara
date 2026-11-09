import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 2, label: "$${}^{2}\\log10=2p$$" },
        { column: 1, label: "$${}^{4}\\log25=p$$" },
        { column: 1, label: "$${}^{5}\\log2=\\dfrac{1}{p}$$" },
        { column: 2, label: "$${}^{2}\\log40=3p$$" },
      ],
    },
  },
};

export default item;
