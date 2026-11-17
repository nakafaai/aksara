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
        {
          correct: true,
          label: "$$35.5$$, $$37.5\\%$$, $$3.01\\times10^{22}$$",
        },
        {
          correct: false,
          label: "$$36.0$$, $$37.5\\%$$, $$3.01\\times10^{22}$$",
        },
        {
          correct: false,
          label: "$$35.5$$, $$18.75\\%$$, $$3.01\\times10^{22}$$",
        },
        {
          correct: false,
          label: "$$35.5$$, $$37.5\\%$$, $$1.51\\times10^{22}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$35.5$$, $$37.5\\%$$, $$3.01\\times10^{22}$$",
        },
        {
          correct: false,
          label: "$$36.0$$, $$37.5\\%$$, $$3.01\\times10^{22}$$",
        },
        {
          correct: false,
          label: "$$35.5$$, $$18.75\\%$$, $$3.01\\times10^{22}$$",
        },
        {
          correct: false,
          label: "$$35.5$$, $$37.5\\%$$, $$1.51\\times10^{22}$$",
        },
      ],
    },
  },
};

export default item;
