import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "temple-moss",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$37{,}5\\%$$" },
        { correct: false, label: "$$40\\%$$" },
        { correct: true, label: "$$60\\%$$" },
        { correct: false, label: "$$62{,}5\\%$$" },
        { correct: false, label: "$$75\\%$$" },
      ],
    },
  },
};

export default item;
