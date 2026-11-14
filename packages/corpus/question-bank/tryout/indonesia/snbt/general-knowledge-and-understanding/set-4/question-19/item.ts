import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "word-relation",
    topic: "analogy",
  },
  stimulus: "rawa",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "kayu : arang" },
        { correct: false, label: "benang : kain" },
        { correct: false, label: "batu : kerikil" },
        { correct: true, label: "lumpur : delta" },
        { correct: false, label: "air : es" },
      ],
    },
  },
};

export default item;
