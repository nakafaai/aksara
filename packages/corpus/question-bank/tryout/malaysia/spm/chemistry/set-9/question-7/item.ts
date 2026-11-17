import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$x=2$$, $$6.20\\text{ g}$$" },
        { correct: true, label: "$$x=10$$, $$3.10\\text{ g}$$" },
        { correct: false, label: "$$x=10$$, $$2.65\\text{ g}$$" },
        { correct: false, label: "$$x=10$$, $$0.310\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$x=2$$, $$6.20\\text{ g}$$" },
        { correct: true, label: "$$x=10$$, $$3.10\\text{ g}$$" },
        { correct: false, label: "$$x=10$$, $$2.65\\text{ g}$$" },
        { correct: false, label: "$$x=10$$, $$0.310\\text{ g}$$" },
      ],
    },
  },
};

export default item;
