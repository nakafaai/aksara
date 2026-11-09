import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "term-meaning",
  },
  stimulus: "tempe",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "memisahkan biji kedelai dari kulit arinya",
        },
        {
          correct: false,
          label: "mengubah warna biji kedelai menjadi putih",
        },
        {
          correct: true,
          label: "membuat biji-biji kedelai saling menempel",
        },
        {
          correct: false,
          label: "melunakkan biji kedelai agar mudah dikunyah",
        },
        {
          correct: false,
          label: "menutupi biji kedelai dengan lapisan daun",
        },
      ],
    },
  },
};

export default item;
