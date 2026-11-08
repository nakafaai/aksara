import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "tin-roof",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pandai memanfaatkan keadaan sulit tanpa menyia-nyiakan apa pun.",
        },
        {
          correct: false,
          label: "Marah karena atap rumahnya bocor di banyak tempat sekaligus.",
        },
        {
          correct: false,
          label:
            "Lelah dan ingin segera pindah ke rumah lain yang lebih layak.",
        },
        {
          correct: false,
          label: "Gembira karena hujan membuat halaman rumahnya tergenang air.",
        },
        {
          correct: false,
          label:
            "Tidak peduli pada kerusakan rumah setelah hujan akhirnya reda.",
        },
      ],
    },
  },
};

export default item;
