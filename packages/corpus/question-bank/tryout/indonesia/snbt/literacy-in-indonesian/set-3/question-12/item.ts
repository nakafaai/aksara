import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "online-loan",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$12\\%$$" },
        { correct: false, label: "$$22\\%$$" },
        { correct: false, label: "sekitar $$13{,}3\\%$$" },
        { correct: true, label: "sekitar $$24{,}4\\%$$" },
        { correct: false, label: "$$10\\%$$" },
      ],
    },
  },
};

export default item;
