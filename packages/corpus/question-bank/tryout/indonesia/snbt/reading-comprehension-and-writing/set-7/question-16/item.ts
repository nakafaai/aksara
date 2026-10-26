import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Peminjam payung memberikan komentar singkat yang tidak panjang.",
        },
        {
          correct: false,
          label:
            "Peminjam payung memberikan komentar singkat sebagai peminjam yang meminjam payung.",
        },
        {
          correct: false,
          label:
            "Peminjam payung memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          correct: true,
          label: "Peminjam payung memberikan komentar singkat.",
        },
        {
          correct: false,
          label:
            "Peminjam payung memberikan komentar singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
