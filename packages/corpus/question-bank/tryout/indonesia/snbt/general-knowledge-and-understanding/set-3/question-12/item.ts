import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "word-relation",
    topic: "synonym",
  },
  stimulus: "bunga",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "hukuman",
        },
        {
          correct: false,
          label: "pinjaman",
        },
        {
          correct: true,
          label: "balas jasa",
        },
        {
          correct: false,
          label: "potongan",
        },
        {
          correct: false,
          label: "sumbangan sukarela",
        },
      ],
    },
  },
};

export default item;
