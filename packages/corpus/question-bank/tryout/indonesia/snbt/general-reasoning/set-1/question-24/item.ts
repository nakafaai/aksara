import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "pinjam",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Persentase kenaikan peminjaman buku sejarah lebih besar daripada persentase kenaikan peminjaman buku fiksi.",
        },
        {
          column: 2,
          label:
            "Pada semester II, peminjaman buku fiksi lebih dari dua kali peminjaman buku sains.",
        },
        {
          column: 1,
          label:
            "Jika peminjaman buku bahasa pada semester III naik dengan persentase yang sama seperti dari semester I ke semester II, peminjaman buku bahasa pada semester III lebih dari $$660$$.",
        },
        {
          column: 2,
          label:
            "Proporsi buku sejarah terhadap total peminjaman naik lebih dari $$3$$ poin persen dari semester I ke semester II.",
        },
      ],
    },
  },
};

export default item;
