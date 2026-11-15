import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "thomas-cup-1958",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penulis menilai cerita itu menyentuh tetapi tidak lengkap, dan menolak pandangan bahwa kemenangan itu berarti lebih dari olahraga.",
        },
        {
          correct: true,
          label:
            "Penulis menilai cerita itu menyentuh tetapi tidak lengkap, dan menegaskan bahwa kemenangan itu berarti lebih dari olahraga.",
        },
        {
          correct: false,
          label:
            "Penulis menolak cerita itu sepenuhnya, tetapi menegaskan bahwa kemenangan itu berarti lebih dari olahraga.",
        },
        {
          correct: false,
          label:
            "Penulis menerima cerita itu sepenuhnya, dan menegaskan bahwa kemenangan itu berarti lebih dari olahraga.",
        },
        {
          correct: false,
          label:
            "Penulis menilai cerita itu sengaja dikarang, dan menolak pandangan bahwa kemenangan itu berarti lebih dari olahraga.",
        },
      ],
    },
  },
};

export default item;
