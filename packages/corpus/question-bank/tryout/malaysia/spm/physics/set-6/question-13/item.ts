import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$3.84 \\times 10^8\\text{ m}$$, and about $$600$$",
        },
        {
          correct: false,
          label: "$$7.68 \\times 10^8\\text{ m}$$, and about $$600$$",
        },
        {
          correct: false,
          label:
            "$$3.84 \\times 10^8\\text{ m}$$, and about $$1.3 \\times 10^{11}$$",
        },
        {
          correct: false,
          label: "$$3.84 \\times 10^8\\text{ m}$$, and about $$2300$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$3.84 \\times 10^8\\text{ m}$$, dan kira-kira $$600$$",
        },
        {
          correct: false,
          label: "$$7.68 \\times 10^8\\text{ m}$$, dan kira-kira $$600$$",
        },
        {
          correct: false,
          label:
            "$$3.84 \\times 10^8\\text{ m}$$, dan kira-kira $$1.3 \\times 10^{11}$$",
        },
        {
          correct: false,
          label: "$$3.84 \\times 10^8\\text{ m}$$, dan kira-kira $$2300$$",
        },
      ],
    },
  },
};

export default item;
