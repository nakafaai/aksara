import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Terdapat dua nilai $$b$$ yang memenuhi semua keterangan pada soal.",
        },
        {
          column: 1,
          label:
            "Grafik $$f$$ dan garis $$y=10-x$$ berpotongan di tepat dua titik.",
        },
        {
          column: 2,
          label: "Jika $$f(p)=3f(q)$$, maka $$p-q={}^{2}\\log3$$.",
        },
        {
          column: 2,
          label:
            "Fungsi $$g(x)=f(x)+x$$ selalu turun pada seluruh bilangan real.",
        },
      ],
    },
  },
};

export default item;
