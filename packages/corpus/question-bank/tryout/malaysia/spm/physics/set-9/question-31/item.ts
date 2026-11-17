import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$9.2\\text{ A}$$, for $$4.6\\text{ h}$$" },
        { correct: false, label: "$$4.6\\text{ A}$$, for $$9.2\\text{ h}$$" },
        { correct: false, label: "$$9.2\\text{ A}$$, for $$6.5\\text{ h}$$" },
        { correct: false, label: "$$9.2\\text{ A}$$, for $$2.0\\text{ h}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$9.2\\text{ A}$$, for $$4.6\\text{ h}$$" },
        { correct: false, label: "$$4.6\\text{ A}$$, for $$9.2\\text{ h}$$" },
        { correct: false, label: "$$9.2\\text{ A}$$, for $$6.5\\text{ h}$$" },
        { correct: false, label: "$$9.2\\text{ A}$$, for $$2.0\\text{ h}$$" },
      ],
    },
  },
};

export default item;
