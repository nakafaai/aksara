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
        { correct: true, label: "$$0.50\\text{ m}$$, and $$20\\text{ J}$$" },
        { correct: false, label: "$$0.50\\text{ m}$$, and $$10\\text{ J}$$" },
        { correct: false, label: "$$1.0\\text{ m}$$, and $$30\\text{ J}$$" },
        { correct: false, label: "$$0.50\\text{ m}$$, and $$30\\text{ J}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.50\\text{ m}$$, dan $$20\\text{ J}$$" },
        { correct: false, label: "$$0.50\\text{ m}$$, dan $$10\\text{ J}$$" },
        { correct: false, label: "$$1.0\\text{ m}$$, dan $$30\\text{ J}$$" },
        { correct: false, label: "$$0.50\\text{ m}$$, dan $$30\\text{ J}$$" },
      ],
    },
  },
};

export default item;
