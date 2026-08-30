import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "In den vier Zeilen geht eine höhere Rohreisproduktion jeweils mit geringeren Reisimporten einher.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sowohl die höchsten Reisimporte als auch die höchste Reisbeschaffung treten 1999 auf.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Die höchste Reisproduktion und die höchste Reisbeschaffung treten im selben Jahr auf.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die höchste Reisproduktion steht in derselben Zeile wie die niedrigste Reisbeschaffung.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sowohl die niedrigsten Reisimporte als auch die niedrigste Reisbeschaffung treten 2004 auf.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Across these four rows, higher paddy production is paired with lower rice imports.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The highest rice imports and the highest rice procurement both occur in 1999.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The highest rice production and the highest rice procurement occur in the same year.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The highest rice production occurs in the same row as the lowest rice procurement.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The lowest rice imports and the lowest rice procurement both occur in 2004.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pada keempat baris tersebut, produksi padi yang lebih tinggi berpasangan dengan impor beras yang lebih rendah.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Impor beras tertinggi dan pengadaan beras tertinggi sama-sama terjadi pada 1999.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Produksi beras tertinggi dan pengadaan beras tertinggi terjadi pada tahun yang sama.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Produksi beras tertinggi terjadi pada baris yang sama dengan pengadaan beras terendah.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Impor beras terendah dan pengadaan beras terendah sama-sama terjadi pada 2004.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
