import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "garam",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "menghentikan" },
        { correct: false, label: "memusnahkan" },
        { correct: true, label: "menekan" },
        { correct: false, label: "menunda" },
        { correct: false, label: "mengalihkan" },
      ],
    },
  },
};

export default item;
