import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pengunjung pasar tukar buku memberikan komentar singkat yang tidak panjang.",
        },
        {
          correct: false,
          label:
            "Pengunjung pasar tukar buku memberikan komentar singkat di pasar tukar buku tempat mereka berkunjung.",
        },
        {
          correct: false,
          label:
            "Pengunjung pasar tukar buku memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          correct: true,
          label: "Pengunjung pasar tukar buku memberikan komentar singkat.",
        },
        {
          correct: false,
          label:
            "Pengunjung pasar tukar buku memberikan komentar yang singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
};

export default item;
