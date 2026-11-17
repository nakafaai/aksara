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
        { correct: false, label: "$$314\\text{ s}$$, $$65.0\\text{ g}$$" },
        { correct: true, label: "$$157\\text{ s}$$, $$65.0\\text{ g}$$" },
        { correct: false, label: "$$157\\text{ s}$$, $$130\\text{ g}$$" },
        { correct: false, label: "$$78.4\\text{ s}$$, $$32.5\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$314\\text{ s}$$, $$65.0\\text{ g}$$" },
        { correct: true, label: "$$157\\text{ s}$$, $$65.0\\text{ g}$$" },
        { correct: false, label: "$$157\\text{ s}$$, $$130\\text{ g}$$" },
        { correct: false, label: "$$78.4\\text{ s}$$, $$32.5\\text{ g}$$" },
      ],
    },
  },
};

export default item;
