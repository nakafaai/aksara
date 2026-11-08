import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "rumput",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Rumput laut siap dipanen dalam waktu sekitar satu setengah bulan.",
        },
        {
          column: 2,
          label:
            "Budi daya rumput laut memerlukan pakan dan pupuk dalam jumlah besar.",
        },
        {
          column: 1,
          label:
            "Perubahan kadar garam air yang mendadak dapat membuat rumput laut sakit.",
        },
        {
          column: 2,
          label: "Harga rumput laut kering selalu tetap sepanjang tahun.",
        },
      ],
    },
  },
};

export default item;
