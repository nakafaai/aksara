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
        { correct: false, label: "$$350\\text{ cm}^3$$, $$277\\text{ g}$$" },
        { correct: true, label: "$$368\\text{ cm}^3$$, $$277\\text{ g}$$" },
        { correct: false, label: "$$368\\text{ cm}^3$$, $$291\\text{ g}$$" },
        { correct: false, label: "$$368\\text{ cm}^3$$, $$350\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$350\\text{ cm}^3$$, $$277\\text{ g}$$" },
        { correct: true, label: "$$368\\text{ cm}^3$$, $$277\\text{ g}$$" },
        { correct: false, label: "$$368\\text{ cm}^3$$, $$291\\text{ g}$$" },
        { correct: false, label: "$$368\\text{ cm}^3$$, $$350\\text{ g}$$" },
      ],
    },
  },
};

export default item;
