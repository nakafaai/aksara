import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "meaning-relations",
  },
  stimulus: "chess-draw",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kakek ingin segera mengakhiri permainan karena kesal hasilnya remis",
        },
        {
          correct: false,
          label:
            "Kakek menuduh Bima bermain curang dengan bantuan buku perpustakaan",
        },
        {
          correct: false,
          label:
            "Kakek menyerah dan mengakui bahwa Bima lebih pandai bermain catur",
        },
        {
          correct: true,
          label:
            "Kakek memberi Bima sisi yang selama ini dipakainya, sebagai tanda ia mulai mengajari Bima secara terbuka",
        },
        {
          correct: false,
          label:
            "Kakek meminta Bima segera mengembalikan buku catur ke perpustakaan",
        },
      ],
    },
  },
};

export default item;
