import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "batik",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Canting dipakai untuk menggoreskan malam pada batik tulis.",
        },
        {
          column: 2,
          label: "Batik cap umumnya lebih mahal daripada batik tulis.",
        },
        {
          column: 1,
          label: "Malam dilunturkan setelah kain dicelup agar motif terlihat.",
        },
        {
          column: 2,
          label: "Motif batik tulis selalu identik di setiap bagian kain.",
        },
      ],
    },
  },
};

export default item;
