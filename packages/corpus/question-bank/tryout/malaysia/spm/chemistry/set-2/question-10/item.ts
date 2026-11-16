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
        { correct: false, label: "$$\\text{Pb}^{2+} + \\text{I}^- \\rightarrow \\text{PbI}$$" },
        { correct: false, label: "$$2\\text{Pb}^{2+} + \\text{I}^- \\rightarrow \\text{Pb}_2\\text{I}$$" },
        { correct: true, label: "$$\\text{Pb}^{2+} + 2\\text{I}^- \\rightarrow \\text{PbI}_2$$" },
        { correct: false, label: "$$\\text{Pb}^{2+} + 4\\text{I}^- \\rightarrow \\text{PbI}_4^{2-}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Pb}^{2+} + \\text{I}^- \\rightarrow \\text{PbI}$$" },
        { correct: false, label: "$$2\\text{Pb}^{2+} + \\text{I}^- \\rightarrow \\text{Pb}_2\\text{I}$$" },
        { correct: true, label: "$$\\text{Pb}^{2+} + 2\\text{I}^- \\rightarrow \\text{PbI}_2$$" },
        { correct: false, label: "$$\\text{Pb}^{2+} + 4\\text{I}^- \\rightarrow \\text{PbI}_4^{2-}$$" },
      ],
    },
  },
};

export default item;
