import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "default-choice",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$150$$ orang" },
        { correct: false, label: "$$100$$ orang" },
        { correct: false, label: "$$750$$ orang" },
        { correct: true, label: "$$250$$ orang" },
        { correct: false, label: "$$400$$ orang" },
      ],
    },
  },
};

export default item;
