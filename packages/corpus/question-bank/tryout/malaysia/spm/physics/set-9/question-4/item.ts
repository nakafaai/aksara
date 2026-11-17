import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$4.5\\text{ m}$$, and $$405\\text{ J}$$" },
        { correct: false, label: "$$2.0\\text{ m}$$, and $$120\\text{ J}$$" },
        { correct: false, label: "$$4.0\\text{ m}$$, and $$180\\text{ J}$$" },
        { correct: true, label: "$$2.0\\text{ m}$$, and $$180\\text{ J}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$4.5\\text{ m}$$, dan $$405\\text{ J}$$" },
        { correct: false, label: "$$2.0\\text{ m}$$, dan $$120\\text{ J}$$" },
        { correct: false, label: "$$4.0\\text{ m}$$, dan $$180\\text{ J}$$" },
        { correct: true, label: "$$2.0\\text{ m}$$, dan $$180\\text{ J}$$" },
      ],
    },
  },
};

export default item;
