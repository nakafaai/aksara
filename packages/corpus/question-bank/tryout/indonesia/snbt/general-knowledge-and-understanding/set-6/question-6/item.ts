import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "abu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "terlempar keluar",
        },
        {
          correct: true,
          label: "tertarik masuk",
        },
        {
          correct: false,
          label: "terbakar habis",
        },
        {
          correct: false,
          label: "tersaring keluar",
        },
        {
          correct: false,
          label: "tertiup menjauh",
        },
      ],
    },
  },
};

export default item;
