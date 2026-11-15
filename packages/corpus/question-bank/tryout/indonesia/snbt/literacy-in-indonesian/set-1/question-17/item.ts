import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "school-meals",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$700$$ hari" },
        { correct: false, label: "$$4{.}900$$ hari" },
        { correct: false, label: "$$5{.}000$$ hari" },
        { correct: false, label: "$$5{.}200$$ hari" },
        { correct: true, label: "$$5{.}900$$ hari" },
      ],
    },
  },
};

export default item;
