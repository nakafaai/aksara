import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "noise-hearing",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$15$$ menit" },
        { correct: false, label: "$$30$$ menit" },
        { correct: false, label: "$$3{,}75$$ menit" },
        { correct: false, label: "$$2$$ jam" },
        { correct: true, label: "$$7{,}5$$ menit" },
      ],
    },
  },
};

export default item;
