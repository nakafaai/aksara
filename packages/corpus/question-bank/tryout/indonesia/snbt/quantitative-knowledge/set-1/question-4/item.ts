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
            "$$f(f(x))=\\dfrac{2x-1}{x}$$ untuk setiap bilangan real $$x\\neq0$$.",
        },
        {
          column: 1,
          label:
            "Daerah hasil fungsi $$f\\circ f$$ adalah himpunan semua bilangan real kecuali $$2$$ dan $$3$$.",
        },
        {
          column: 1,
          label:
            "Grafik $$y=f(x)$$ dan grafik $$y=f^{-1}(x)$$ berpotongan di tepat satu titik.",
        },
        {
          column: 2,
          label:
            "Daerah asal fungsi $$f^{-1}$$ adalah himpunan semua bilangan real kecuali $$-1$$.",
        },
      ],
    },
  },
};

export default item;
