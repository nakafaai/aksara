import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  stimulus: "running-track",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Selisih panjang satu putaran jalur 8 dan jalur 1 tidak bergantung pada panjang bagian lurus.",
        },
        {
          column: 1,
          label: "Jika jari-jari tepi dalam jalur 1 diperbesar $$2\\text{ m}$$ dan setiap bagian lurus diperpendek $$2\\pi\\text{ m}$$, panjang satu putaran jalur 1 tidak berubah.",
        },
        {
          column: 2,
          label: "Luas lapangan yang dikelilingi tepi dalam jalur 1 kurang dari $$1$$ hektare $$(10{.}000\\text{ m}^2)$$.",
        },
        {
          column: 2,
          label: "Jika lebar setiap jalur diubah menjadi $$1{,}5\\text{ m}$$, titik start jalur 4 harus dimajukan lebih dari $$5\\text{ m}$$ lebih jauh daripada saat lebarnya $$1{,}25\\text{ m}$$.",
        },
      ],
    },
  },
};

export default item;
