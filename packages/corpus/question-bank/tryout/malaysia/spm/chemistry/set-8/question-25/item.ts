import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.054\\text{ g}$$, $$0.648\\text{ g}$$" },
        { correct: false, label: "$$0.081\\text{ g}$$, $$0.648\\text{ g}$$" },
        { correct: false, label: "$$0.054\\text{ g}$$, $$0.324\\text{ g}$$" },
        { correct: false, label: "$$0.027\\text{ g}$$, $$0.648\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.054\\text{ g}$$, $$0.648\\text{ g}$$" },
        { correct: false, label: "$$0.081\\text{ g}$$, $$0.648\\text{ g}$$" },
        { correct: false, label: "$$0.054\\text{ g}$$, $$0.324\\text{ g}$$" },
        { correct: false, label: "$$0.027\\text{ g}$$, $$0.648\\text{ g}$$" },
      ],
    },
  },
};

export default item;
