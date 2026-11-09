import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "class-election",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Tidak ada kandidat yang menang pada putaran pertama.",
        },
        {
          column: 2,
          label:
            "Jika pada putaran kedua semua pemilih Citra memilih Bunga, semua pemilih Dimas memilih Andra, dan pemilih Andra serta Bunga tetap, Bunga menang.",
        },
        {
          column: 2,
          label: "Andra memperoleh $$45\\%$$ suara sah pada putaran pertama.",
        },
        {
          column: 1,
          label: "Kandidat yang maju ke putaran kedua adalah Andra dan Bunga.",
        },
      ],
    },
  },
};

export default item;
