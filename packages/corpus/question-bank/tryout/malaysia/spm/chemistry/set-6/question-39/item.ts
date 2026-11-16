import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.145\\text{ g}$$, $$0.145\\text{ g}$$" },
        { correct: true, label: "$$1.10\\text{ g}$$, $$0.321\\text{ g}$$" },
        { correct: false, label: "$$11.0\\text{ g}$$, $$3.21\\text{ g}$$" },
        { correct: false, label: "$$1.10\\text{ g}$$, $$0.145\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.145\\text{ g}$$, $$0.145\\text{ g}$$" },
        { correct: true, label: "$$1.10\\text{ g}$$, $$0.321\\text{ g}$$" },
        { correct: false, label: "$$11.0\\text{ g}$$, $$3.21\\text{ g}$$" },
        { correct: false, label: "$$1.10\\text{ g}$$, $$0.145\\text{ g}$$" },
      ],
    },
  },
};

export default item;
