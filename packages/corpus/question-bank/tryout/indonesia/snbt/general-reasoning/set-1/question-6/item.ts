import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "explanation",
  },
  stimulus: "bibit",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bibit yang disiram pada sore hari menerima cahaya matahari lebih lama setiap hari, sehingga fotosintesisnya lebih banyak daripada bibit yang disiram pada pagi hari.",
        },
        {
          correct: false,
          label:
            "Kompos melepaskan unsur hara ke tanah lebih lambat daripada pupuk cair.",
        },
        {
          correct: false,
          label:
            "Petani lebih teliti mengukur takaran air ketika menyiram pada sore hari.",
        },
        {
          correct: true,
          label:
            "Nitrogen pupuk cair mudah lepas ke udara saat tanah panas, sedangkan larutan yang disiram sore sempat meresap semalaman.",
        },
        {
          correct: false,
          label:
            "Varietas cabai yang ditanam membutuhkan lebih banyak air daripada varietas lain.",
        },
      ],
    },
  },
};

export default item;
