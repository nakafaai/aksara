import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$150\\,\\Omega$$, and about $$18\\text{ mA}$$",
        },
        {
          correct: true,
          label: "$$145\\,\\Omega$$, and about $$13\\text{ mA}$$",
        },
        {
          correct: false,
          label: "$$145\\,\\Omega$$, and about $$18\\text{ mA}$$",
        },
        {
          correct: false,
          label: "$$155\\,\\Omega$$, and about $$13\\text{ mA}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$150\\,\\Omega$$, dan kira-kira $$18\\text{ mA}$$",
        },
        {
          correct: true,
          label: "$$145\\,\\Omega$$, dan kira-kira $$13\\text{ mA}$$",
        },
        {
          correct: false,
          label: "$$145\\,\\Omega$$, dan kira-kira $$18\\text{ mA}$$",
        },
        {
          correct: false,
          label: "$$155\\,\\Omega$$, dan kira-kira $$13\\text{ mA}$$",
        },
      ],
    },
  },
};

export default item;
