import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "el-nino-drought",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$35\\%$$" },
        { correct: false, label: "$$42\\%$$" },
        { correct: true, label: "$$45\\%$$" },
        { correct: false, label: "$$60\\%$$" },
        { correct: false, label: "$$70\\%$$" },
      ],
    },
  },
};

export default item;
