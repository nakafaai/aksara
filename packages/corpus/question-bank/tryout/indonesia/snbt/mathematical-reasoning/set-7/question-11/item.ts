import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "aquarium-salinity",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Membuang $$20\\text{ liter}$$ air lalu mengisi ulang dengan air tawar sebanyak $$2$$ kali menurunkan salinitas sama besar dengan membuang $$40\\text{ liter}$$ air lalu mengisi ulang dengan air tawar sebanyak $$1$$ kali.",
        },
        {
          column: 1,
          label:
            "Jika air yang menguap diisi ulang dengan air laut buatan setiap hari, salinitas akuarium naik dengan besar yang sama setiap hari.",
        },
        {
          column: 2,
          label:
            "Jika salinitas mula-mula di atas $$35\\text{ g/L}$$, penggantian air berulang dengan air laut buatan suatu saat akan membuat salinitas turun di bawah $$35\\text{ g/L}$$.",
        },
        {
          column: 2,
          label:
            "Dari akuarium penuh bersalinitas $$42\\text{ g/L}$$, salinitas dapat dijadikan tepat $$35\\text{ g/L}$$ dengan sekali mengganti $$20\\text{ liter}$$ air memakai air laut buatan.",
        },
      ],
    },
  },
};

export default item;
