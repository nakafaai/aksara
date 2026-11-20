import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "gravitation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$2.0\\times10^{7}\\text{ m}$$, $$7.7\\text{ h}$$, and it rises in the west every $$11\\text{ h}$$",
        },
        {
          correct: false,
          label:
            "$$2.0\\times10^{7}\\text{ m}$$, $$7.7\\text{ h}$$, and it rises in the west every $$7.7\\text{ h}$$",
        },
        {
          correct: false,
          label:
            "$$2.0\\times10^{7}\\text{ m}$$, $$7.7\\text{ h}$$, and it rises in the west every $$5.8\\text{ h}$$",
        },
        {
          correct: false,
          label:
            "$$2.0\\times10^{7}\\text{ m}$$, $$7.7\\text{ h}$$, and it rises in the east every $$11\\text{ h}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$2.0\\times10^{7}\\text{ m}$$, $$7.7\\text{ j}$$, dan ia terbit di barat setiap $$11\\text{ j}$$",
        },
        {
          correct: false,
          label:
            "$$2.0\\times10^{7}\\text{ m}$$, $$7.7\\text{ j}$$, dan ia terbit di barat setiap $$7.7\\text{ j}$$",
        },
        {
          correct: false,
          label:
            "$$2.0\\times10^{7}\\text{ m}$$, $$7.7\\text{ j}$$, dan ia terbit di barat setiap $$5.8\\text{ j}$$",
        },
        {
          correct: false,
          label:
            "$$2.0\\times10^{7}\\text{ m}$$, $$7.7\\text{ j}$$, dan ia terbit di timur setiap $$11\\text{ j}$$",
        },
      ],
    },
  },
};

export default item;
