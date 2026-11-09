import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "author-view",
  },
  stimulus: "film-review",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "dialog yang panjang dan penuh penjelasan dalam film itu",
        },
        {
          correct: false,
          label: "jumlah adegan lomba layang-layang yang banyak dalam film",
        },
        {
          correct: false,
          label:
            "kecepatan cerita yang bergerak dari satu adegan ke adegan lain",
        },
        {
          correct: true,
          label: "cara film menyampaikan perasaan tanpa banyak kata",
        },
        {
          correct: false,
          label: "musik latar yang menjelaskan perasaan setiap tokohnya",
        },
      ],
    },
  },
};

export default item;
