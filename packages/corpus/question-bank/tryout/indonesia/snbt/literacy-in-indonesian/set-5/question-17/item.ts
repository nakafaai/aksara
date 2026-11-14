import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "river-quality",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$20\\%$$" },
        { correct: false, label: "$$45\\%$$" },
        { correct: false, label: "$$55\\%$$" },
        { correct: false, label: "$$60\\%$$" },
        { correct: true, label: "$$80\\%$$" },
      ],
    },
  },
};

export default item;
