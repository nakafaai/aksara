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
        { correct: false, label: "$$0.951\\text{ g}$$, $$0.448\\text{ g}$$" },
        { correct: false, label: "$$0.252\\text{ g}$$, $$0.224\\text{ g}$$" },
        { correct: true, label: "$$0.476\\text{ g}$$, $$0.224\\text{ g}$$" },
        { correct: false, label: "$$0.476\\text{ g}$$, $$0.476\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.951\\text{ g}$$, $$0.448\\text{ g}$$" },
        { correct: false, label: "$$0.252\\text{ g}$$, $$0.224\\text{ g}$$" },
        { correct: true, label: "$$0.476\\text{ g}$$, $$0.224\\text{ g}$$" },
        { correct: false, label: "$$0.476\\text{ g}$$, $$0.476\\text{ g}$$" },
      ],
    },
  },
};

export default item;
