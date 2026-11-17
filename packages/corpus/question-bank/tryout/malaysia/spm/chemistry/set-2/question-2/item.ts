import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$35.5$$, $$3.01\\times10^{22}$$, $$12.7\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$36.0$$, $$3.01\\times10^{22}$$, $$12.7\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$35.5$$, $$4.52\\times10^{22}$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$35.5$$, $$3.01\\times10^{22}$$, $$6.35\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$35.5$$, $$3.01\\times10^{22}$$, $$12.7\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$36.0$$, $$3.01\\times10^{22}$$, $$12.7\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$35.5$$, $$4.52\\times10^{22}$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$35.5$$, $$3.01\\times10^{22}$$, $$6.35\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
