import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "thomas-cup-1958",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Kedaulatan Indonesia diakui lebih dari sepuluh tahun sebelum kemenangan di Singapura.",
        },
        {
          column: 2,
          label:
            "Malaya sudah memenangi Piala Thomas lebih dari tiga kali sebelum 1958.",
        },
        {
          column: 1,
          label:
            "PBSI baru berumur sekitar tujuh tahun ketika Indonesia merebut Piala Thomas.",
        },
        {
          column: 2,
          label:
            "Para pemain regu 1958 baru mulai berlatih bulu tangkis setelah PBSI berdiri.",
        },
        {
          column: 1,
          label:
            "Sesudah merebut Piala Thomas pada 1958, Indonesia memegangnya tanpa putus sampai sedikitnya 1964.",
        },
      ],
    },
  },
};

export default item;
