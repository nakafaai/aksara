import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "bakau",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Mengurangi kekuatan",
        },
        {
          correct: false,
          label: "Memantulkan kembali",
        },
        {
          correct: false,
          label: "Menambah kecepatan",
        },
        {
          correct: false,
          label: "Menyimpan di dalam tanah",
        },
        {
          correct: false,
          label: "Mengalihkan ke arah lain",
        },
      ],
    },
  },
};

export default item;
