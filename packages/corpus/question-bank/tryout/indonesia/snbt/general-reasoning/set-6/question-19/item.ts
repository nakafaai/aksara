import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "In den vier Zeilen geht eine höhere Rohreisproduktion jeweils mit geringeren Reisimporten einher.",
        },
        {
          isCorrect: false,
          label:
            "Sowohl die höchsten Reisimporte als auch die höchste Reisbeschaffung treten 1999 auf.",
        },
        {
          isCorrect: false,
          label:
            "Die höchste Reisproduktion steht in derselben Zeile wie die niedrigste Reisbeschaffung.",
        },
        {
          isCorrect: false,
          label:
            "Sowohl die niedrigsten Reisimporte als auch die niedrigste Reisbeschaffung treten 2004 auf.",
        },
        {
          isCorrect: true,
          label:
            "Die höchste Reisproduktion und die höchste Reisbeschaffung treten im selben Jahr auf.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Across these four rows, higher paddy production is paired with lower rice imports.",
        },
        {
          isCorrect: false,
          label:
            "The highest rice imports and the highest rice procurement both occur in 1999.",
        },
        {
          isCorrect: false,
          label:
            "The highest rice production occurs in the same row as the lowest rice procurement.",
        },
        {
          isCorrect: false,
          label:
            "The lowest rice imports and the lowest rice procurement both occur in 2004.",
        },
        {
          isCorrect: true,
          label:
            "The highest rice production and the highest rice procurement occur in the same year.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pada keempat baris tersebut, produksi padi yang lebih tinggi berpasangan dengan impor beras yang lebih rendah.",
        },
        {
          isCorrect: false,
          label:
            "Impor beras tertinggi dan pengadaan beras tertinggi sama-sama terjadi pada 1999.",
        },
        {
          isCorrect: false,
          label:
            "Produksi beras tertinggi terjadi pada baris yang sama dengan pengadaan beras terendah.",
        },
        {
          isCorrect: false,
          label:
            "Impor beras terendah dan pengadaan beras terendah sama-sama terjadi pada 2004.",
        },
        {
          isCorrect: true,
          label:
            "Produksi beras tertinggi dan pengadaan beras tertinggi terjadi pada tahun yang sama.",
        },
      ],
    },
  },
};

export default item;
