import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1.7\\text{ s}$$, and $$100\\text{ m}$$" },
        { correct: false, label: "$$2.5\\text{ s}$$, and $$105\\text{ m}$$" },
        { correct: true, label: "$$1.7\\text{ s}$$, and $$105\\text{ m}$$" },
        { correct: false, label: "$$1.7\\text{ s}$$, and $$120\\text{ m}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1.7\\text{ s}$$, dan $$100\\text{ m}$$" },
        { correct: false, label: "$$2.5\\text{ s}$$, dan $$105\\text{ m}$$" },
        { correct: true, label: "$$1.7\\text{ s}$$, dan $$105\\text{ m}$$" },
        { correct: false, label: "$$1.7\\text{ s}$$, dan $$120\\text{ m}$$" },
      ],
    },
  },
};

export default item;
