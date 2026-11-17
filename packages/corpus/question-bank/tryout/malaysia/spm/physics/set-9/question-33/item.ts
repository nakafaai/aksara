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
        { correct: true, label: "$$13.5\\text{ W}$$, and $$48\\text{ K}$$" },
        { correct: false, label: "$$18\\text{ W}$$, and $$3.0\\text{ K}$$" },
        { correct: false, label: "$$13.5\\text{ W}$$, and $$3.0\\text{ K}$$" },
        { correct: false, label: "$$18\\text{ W}$$, and $$48\\text{ K}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$13.5\\text{ W}$$, dan $$48\\text{ K}$$" },
        { correct: false, label: "$$18\\text{ W}$$, dan $$3.0\\text{ K}$$" },
        { correct: false, label: "$$13.5\\text{ W}$$, dan $$3.0\\text{ K}$$" },
        { correct: false, label: "$$18\\text{ W}$$, dan $$48\\text{ K}$$" },
      ],
    },
  },
};

export default item;
