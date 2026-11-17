import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$155\\text{ m}$$, and $$1730\\text{ N}$$" },
        { correct: true, label: "$$162.5\\text{ m}$$, and $$1730\\text{ N}$$" },
        { correct: false, label: "$$162.5\\text{ m}$$, and $$930\\text{ N}$$" },
        { correct: false, label: "$$110\\text{ m}$$, and $$930\\text{ N}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$155\\text{ m}$$, dan $$1730\\text{ N}$$" },
        { correct: true, label: "$$162.5\\text{ m}$$, dan $$1730\\text{ N}$$" },
        { correct: false, label: "$$162.5\\text{ m}$$, dan $$930\\text{ N}$$" },
        { correct: false, label: "$$110\\text{ m}$$, dan $$930\\text{ N}$$" },
      ],
    },
  },
};

export default item;
