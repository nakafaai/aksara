import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jika dipilih satu siswa secara acak dari peserta Pramuka, peluang siswa itu perempuan adalah $$\\tfrac58$$.",
        },
        {
          column: 2,
          label: "Lebih dari setengah siswa kelas itu mengikuti Basket.",
        },
        {
          column: 2,
          label: "Lebih dari $$65\\%$$ siswa laki-laki mengikuti Basket.",
        },
        {
          column: 1,
          label: "Banyak siswa laki-laki sama dengan banyak siswa perempuan.",
        },
      ],
    },
  },
};

export default item;
