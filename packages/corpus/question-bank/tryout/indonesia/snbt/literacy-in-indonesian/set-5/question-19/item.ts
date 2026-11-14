import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "river-quality",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Pada 2021, BOD terus turun dari T3 sampai T5." },
        {
          column: 1,
          label:
            "Pada 2024, semua titik pantau di hilir sentra tahu memenuhi syarat DO untuk air kelas dua.",
        },
        { column: 2, label: "Dari 2021 ke 2024, DO di T5 naik." },
        {
          column: 2,
          label: "Pada 2024, BOD di T2 melampaui baku mutu air kelas dua.",
        },
        {
          column: 1,
          label:
            "Selisih DO antara T2 dan T3 pada 2024 kurang dari separuh selisihnya pada 2021.",
        },
      ],
    },
  },
};

export default item;
