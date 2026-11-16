import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$150\\text{ g}$$, $$0\\text{ g}$$" },
        { correct: false, label: "$$256\\text{ g}$$, $$106\\text{ g}$$" },
        { correct: false, label: "$$513\\text{ g}$$, $$185\\text{ g}$$" },
        { correct: true, label: "$$256\\text{ g}$$, $$185\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$150\\text{ g}$$, $$0\\text{ g}$$" },
        { correct: false, label: "$$256\\text{ g}$$, $$106\\text{ g}$$" },
        { correct: false, label: "$$513\\text{ g}$$, $$185\\text{ g}$$" },
        { correct: true, label: "$$256\\text{ g}$$, $$185\\text{ g}$$" },
      ],
    },
  },
};

export default item;
