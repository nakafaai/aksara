import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\text{GeO}_2$$, $$2.10\\text{ g}$$" },
        { correct: false, label: "$$\\text{GeO}$$, $$1.78\\text{ g}$$" },
        {
          correct: false,
          label: "$$\\text{Ge}_2\\text{O}$$, $$1.62\\text{ g}$$",
        },
        { correct: false, label: "$$\\text{GeO}_2$$, $$0.64\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\text{GeO}_2$$, $$2.10\\text{ g}$$" },
        { correct: false, label: "$$\\text{GeO}$$, $$1.78\\text{ g}$$" },
        {
          correct: false,
          label: "$$\\text{Ge}_2\\text{O}$$, $$1.62\\text{ g}$$",
        },
        { correct: false, label: "$$\\text{GeO}_2$$, $$0.64\\text{ g}$$" },
      ],
    },
  },
};

export default item;
