import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "word-meaning",
  },
  stimulus: "larva-compost",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "marah",
        },
        {
          correct: false,
          label: "kehilangan uang",
        },
        {
          correct: true,
          label: "tidak sanggup lagi menangani",
        },
        {
          correct: false,
          label: "bingung memilih",
        },
        {
          correct: false,
          label: "kecewa",
        },
      ],
    },
  },
};

export default item;
