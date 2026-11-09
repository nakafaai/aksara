import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "polysemy",
  },
  stimulus: "hoaks",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menangkap ikan dengan kail",
        },
        {
          correct: true,
          label: "membangkitkan",
        },
        {
          correct: false,
          label: "mengurangi",
        },
        {
          correct: false,
          label: "menyembunyikan",
        },
        {
          correct: false,
          label: "menenangkan",
        },
      ],
    },
  },
};

export default item;
