import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$13.5\\text{ W}$$, and $$72\\text{ W}$$" },
        { correct: false, label: "$$18\\text{ W}$$, and $$4.5\\text{ W}$$" },
        { correct: false, label: "$$13.5\\text{ W}$$, and $$4.5\\text{ W}$$" },
        { correct: false, label: "$$18\\text{ W}$$, and $$72\\text{ W}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$13.5\\text{ W}$$, dan $$72\\text{ W}$$" },
        { correct: false, label: "$$18\\text{ W}$$, dan $$4.5\\text{ W}$$" },
        { correct: false, label: "$$13.5\\text{ W}$$, dan $$4.5\\text{ W}$$" },
        { correct: false, label: "$$18\\text{ W}$$, dan $$72\\text{ W}$$" },
      ],
    },
  },
};

export default item;
