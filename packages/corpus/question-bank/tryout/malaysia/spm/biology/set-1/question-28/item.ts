import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "sexual-reproduction-in-flowering-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$36$$, $$36$$, $$48$$",
        },
        {
          correct: false,
          label: "$$60$$, $$36$$, $$36$$",
        },
        {
          correct: true,
          label: "$$60$$, $$36$$, $$48$$",
        },
        {
          correct: false,
          label: "$$72$$, $$36$$, $$48$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$36$$, $$36$$, $$48$$",
        },
        {
          correct: false,
          label: "$$60$$, $$36$$, $$36$$",
        },
        {
          correct: true,
          label: "$$60$$, $$36$$, $$48$$",
        },
        {
          correct: false,
          label: "$$72$$, $$36$$, $$48$$",
        },
      ],
    },
  },
};

export default item;
