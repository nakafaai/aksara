import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "In den vier Zeilen geht eine höhere Rohreisproduktion jeweils mit geringeren Reisimporten einher.",
      value: false,
    },
    {
      label:
        "Sowohl die höchsten Reisimporte als auch die höchste Reisbeschaffung treten 1999 auf.",
      value: false,
    },
    {
      label:
        "Die höchste Reisproduktion und die höchste Reisbeschaffung treten im selben Jahr auf.",
      value: true,
    },
    {
      label:
        "Die höchste Reisproduktion steht in derselben Zeile wie die niedrigste Reisbeschaffung.",
      value: false,
    },
    {
      label:
        "Sowohl die niedrigsten Reisimporte als auch die niedrigste Reisbeschaffung treten 2004 auf.",
      value: false,
    },
  ],
  en: [
    {
      label:
        "Across these four rows, higher paddy production is paired with lower rice imports.",
      value: false,
    },
    {
      label:
        "The highest rice imports and the highest rice procurement both occur in 1999.",
      value: false,
    },
    {
      label:
        "The highest rice production and the highest rice procurement occur in the same year.",
      value: true,
    },
    {
      label:
        "The highest rice production occurs in the same row as the lowest rice procurement.",
      value: false,
    },
    {
      label:
        "The lowest rice imports and the lowest rice procurement both occur in 2004.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Pada keempat baris tersebut, produksi padi yang lebih tinggi berpasangan dengan impor beras yang lebih rendah.",
      value: false,
    },
    {
      label:
        "Impor beras tertinggi dan pengadaan beras tertinggi sama-sama terjadi pada 1999.",
      value: false,
    },
    {
      label:
        "Produksi beras tertinggi dan pengadaan beras tertinggi terjadi pada tahun yang sama.",
      value: true,
    },
    {
      label:
        "Produksi beras tertinggi terjadi pada baris yang sama dengan pengadaan beras terendah.",
      value: false,
    },
    {
      label:
        "Impor beras terendah dan pengadaan beras terendah sama-sama terjadi pada 2004.",
      value: false,
    },
  ],
};

export default choices;
