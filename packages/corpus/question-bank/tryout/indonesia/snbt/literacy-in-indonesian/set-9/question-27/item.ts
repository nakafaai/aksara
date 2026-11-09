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
          label:
            "buruk, karena bagian tengahnya berisi tiga adegan lomba yang sama",
        },
        {
          correct: false,
          label:
            "sempurna, karena tidak ada satu pun adegan yang perlu diperbaiki",
        },
        {
          correct: true,
          label:
            "layak ditonton, walaupun bagian tengahnya terasa berlarut-larut",
        },
        {
          correct: false,
          label: "membosankan, karena kamera terlalu lama diam di wajah pemain",
        },
        {
          correct: false,
          label:
            "hanya cocok untuk penonton dewasa yang pernah kehilangan pekerjaan",
        },
      ],
    },
  },
};

export default item;
