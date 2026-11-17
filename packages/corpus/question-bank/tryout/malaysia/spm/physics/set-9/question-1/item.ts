import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "measurement",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.202 \\pm 0.013\\text{ s}$$" },
        { correct: true, label: "$$0.202 \\pm 0.006\\text{ s}$$" },
        { correct: false, label: "$$0.143 \\pm 0.004\\text{ s}$$" },
        { correct: false, label: "$$0.202 \\pm 0.025\\text{ s}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.202 \\pm 0.013\\text{ s}$$" },
        { correct: true, label: "$$0.202 \\pm 0.006\\text{ s}$$" },
        { correct: false, label: "$$0.143 \\pm 0.004\\text{ s}$$" },
        { correct: false, label: "$$0.202 \\pm 0.025\\text{ s}$$" },
      ],
    },
  },
};

export default item;
