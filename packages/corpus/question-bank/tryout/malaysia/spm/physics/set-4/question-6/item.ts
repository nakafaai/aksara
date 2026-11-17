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
        { correct: false, label: "$$10\\text{ N}$$, and $$0.75\\text{ m}$$" },
        { correct: false, label: "$$9.0\\text{ N}$$, and $$0.50\\text{ m}$$" },
        { correct: true, label: "$$9.0\\text{ N}$$, and $$0.75\\text{ m}$$" },
        { correct: false, label: "$$9.0\\text{ N}$$, and $$0.83\\text{ m}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$10\\text{ N}$$, dan $$0.75\\text{ m}$$" },
        { correct: false, label: "$$9.0\\text{ N}$$, dan $$0.50\\text{ m}$$" },
        { correct: true, label: "$$9.0\\text{ N}$$, dan $$0.75\\text{ m}$$" },
        { correct: false, label: "$$9.0\\text{ N}$$, dan $$0.83\\text{ m}$$" },
      ],
    },
  },
};

export default item;
