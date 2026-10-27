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
            "Pengunjung taman memberikan komentar singkat yang tidak panjang.",
        },
        {
          correct: true,
          label: "Pengunjung taman memberikan komentar singkat.",
        },
        {
          correct: false,
          label:
            "Pengunjung taman memberikan komentar singkat sebagai orang yang mengunjungi taman.",
        },
        {
          correct: false,
          label:
            "Pengunjung taman memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          correct: false,
          label:
            "Pengunjung taman memberikan komentar singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
};

export default item;
