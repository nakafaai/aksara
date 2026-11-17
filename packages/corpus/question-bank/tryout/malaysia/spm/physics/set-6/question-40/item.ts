import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "quantum-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.9\\text{ m s}^{-1}$$, and $$75\\text{ km}$$",
        },
        {
          correct: true,
          label: "$$7.8\\text{ m s}^{-1}$$, and $$150\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$7.8\\text{ m s}^{-1}$$, and $$230\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$7.8\\text{ m s}^{-1}$$, and $$300\\text{ km}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.9\\text{ m s}^{-1}$$, dan $$75\\text{ km}$$",
        },
        {
          correct: true,
          label: "$$7.8\\text{ m s}^{-1}$$, dan $$150\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$7.8\\text{ m s}^{-1}$$, dan $$230\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$7.8\\text{ m s}^{-1}$$, dan $$300\\text{ km}$$",
        },
      ],
    },
  },
};

export default item;
