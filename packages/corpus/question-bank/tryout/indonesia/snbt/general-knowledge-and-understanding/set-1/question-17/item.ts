import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "karang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Dengan cepat dan sekaligus",
        },
        {
          correct: false,
          label: "Secara tiba-tiba",
        },
        {
          correct: false,
          label: "Hanya sekali waktu",
        },
        {
          correct: false,
          label: "Berulang kali",
        },
        {
          correct: true,
          label: "Sedikit demi sedikit",
        },
      ],
    },
  },
};

export default item;
