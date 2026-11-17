import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$1.58\\text{ g}$$, $$96.2\\%$$" },
        { correct: false, label: "$$1.13\\text{ g}$$, $$96.2\\%$$" },
        { correct: false, label: "$$1.58\\text{ g}$$, $$48.1\\%$$" },
        { correct: false, label: "$$1.13\\text{ g}$$, $$48.1\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$1.58\\text{ g}$$, $$96.2\\%$$" },
        { correct: false, label: "$$1.13\\text{ g}$$, $$96.2\\%$$" },
        { correct: false, label: "$$1.58\\text{ g}$$, $$48.1\\%$$" },
        { correct: false, label: "$$1.13\\text{ g}$$, $$48.1\\%$$" },
      ],
    },
  },
};

export default item;
