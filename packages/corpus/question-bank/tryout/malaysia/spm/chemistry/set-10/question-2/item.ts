import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$35.5$$, $$37.5\\%$$, $$0.463\\text{ g}$$" },
        { correct: false, label: "$$36.0$$, $$37.5\\%$$, $$0.463\\text{ g}$$" },
        {
          correct: false,
          label: "$$35.5$$, $$18.75\\%$$, $$0.463\\text{ g}$$",
        },
        { correct: false, label: "$$35.5$$, $$37.5\\%$$, $$1.85\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$35.5$$, $$37.5\\%$$, $$0.463\\text{ g}$$" },
        { correct: false, label: "$$36.0$$, $$37.5\\%$$, $$0.463\\text{ g}$$" },
        {
          correct: false,
          label: "$$35.5$$, $$18.75\\%$$, $$0.463\\text{ g}$$",
        },
        { correct: false, label: "$$35.5$$, $$37.5\\%$$, $$1.85\\text{ g}$$" },
      ],
    },
  },
};

export default item;
