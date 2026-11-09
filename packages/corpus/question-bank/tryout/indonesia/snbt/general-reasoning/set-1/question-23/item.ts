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
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Proporsi peminjaman buku sains terhadap total peminjaman turun dari semester I ke semester II.",
        },
        {
          correct: false,
          label:
            "Kategori dengan kenaikan jumlah peminjaman terbesar juga memiliki persentase kenaikan terbesar.",
        },
        {
          correct: false,
          label: "Peminjaman buku bahasa naik lebih dari $$15\\%$$.",
        },
        {
          correct: false,
          label:
            "Lebih dari separuh buku yang dipinjam pada semester II adalah buku fiksi.",
        },
        {
          correct: false,
          label: "Total peminjaman naik lebih dari $$20\\%$$.",
        },
      ],
    },
  },
};

export default item;
