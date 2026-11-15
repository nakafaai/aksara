import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "survivorship-bias",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Berapa banyak rumah yang dibangun pada masa yang sama dengan rumah-rumah tua itu, tetapi sudah runtuh atau dibongkar?",
        },
        {
          correct: false,
          label:
            "Berapa banyak rumah baru yang dibangun di kota itu dalam sepuluh tahun terakhir?",
        },
        {
          correct: true,
          label:
            "Apakah rumah tua yang rapuh lebih mungkin sudah dibongkar sebelum sempat diperiksa?",
        },
        {
          correct: false,
          label:
            "Berapa harga bahan bangunan pada masa rumah-rumah tua itu dibangun?",
        },
        {
          correct: false,
          label:
            "Apakah rumah-rumah tua itu dicat ulang dalam beberapa tahun terakhir?",
        },
      ],
    },
  },
};

export default item;
