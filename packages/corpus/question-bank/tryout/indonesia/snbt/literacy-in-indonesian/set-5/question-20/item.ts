import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "river-quality",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Keberadaan sawah di antara T4 dan T5 tidak membedakan keadaan 2021 dari keadaan 2024.",
        },
        {
          column: 1,
          label:
            "Perbedaan musim tidak dapat menjadi penjelasan utama bagi perubahan angka dari 2021 ke 2024.",
        },
        {
          column: 2,
          label:
            "Tanpa kawasan perumahan itu, BOD di T5 pada 2024 pasti lebih rendah daripada BOD di T4.",
        },
        {
          column: 1,
          label:
            "Pada 2024, bahan organik yang masuk ke sungai di antara T4 dan T5 lebih banyak daripada yang sempat terurai di ruas itu.",
        },
        {
          column: 2,
          label:
            "Air sungai yang tiba di kawasan sentra tahu pada 2024 lebih bersih daripada pada 2021.",
        },
      ],
    },
  },
};

export default item;
