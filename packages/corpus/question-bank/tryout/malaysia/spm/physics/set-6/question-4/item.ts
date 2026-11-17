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
        { correct: false, label: "$$62\\text{ s}$$, and $$71\\text{ J}$$" },
        { correct: false, label: "$$60\\text{ s}$$, and $$64\\text{ J}$$" },
        { correct: true, label: "$$60\\text{ s}$$, and $$66\\text{ J}$$" },
        { correct: false, label: "$$60\\text{ s}$$, and $$37\\text{ J}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$62\\text{ s}$$, dan $$71\\text{ J}$$" },
        { correct: false, label: "$$60\\text{ s}$$, dan $$64\\text{ J}$$" },
        { correct: true, label: "$$60\\text{ s}$$, dan $$66\\text{ J}$$" },
        { correct: false, label: "$$60\\text{ s}$$, dan $$37\\text{ J}$$" },
      ],
    },
  },
};

export default item;
