import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{M}^{+} + \\text{I}^- \\rightarrow \\text{MI}$$" },
        { correct: false, label: "$$\\text{M}^{2+} + 2\\text{I}^- \\rightarrow \\text{MI}_2$$" },
        { correct: true, label: "$$\\text{M}^{3+} + 3\\text{I}^- \\rightarrow \\text{MI}_3$$" },
        { correct: false, label: "$$2\\text{M}^{3+} + 3\\text{I}^- \\rightarrow \\text{M}_2\\text{I}_3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{M}^{+} + \\text{I}^- \\rightarrow \\text{MI}$$" },
        { correct: false, label: "$$\\text{M}^{2+} + 2\\text{I}^- \\rightarrow \\text{MI}_2$$" },
        { correct: true, label: "$$\\text{M}^{3+} + 3\\text{I}^- \\rightarrow \\text{MI}_3$$" },
        { correct: false, label: "$$2\\text{M}^{3+} + 3\\text{I}^- \\rightarrow \\text{M}_2\\text{I}_3$$" },
      ],
    },
  },
};

export default item;
