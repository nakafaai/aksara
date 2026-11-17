import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.17\\text{ mm}$$, $$1.1\\text{ MHz}$$, and about $$31\\%$$",
        },
        {
          correct: true,
          label:
            "$$0.77\\text{ mm}$$, $$5.1\\text{ MHz}$$, and about $$0.5\\%$$",
        },
        {
          correct: false,
          label: "$$0.77\\text{ mm}$$, $$5.1\\text{ MHz}$$, and about $$7\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.77\\text{ mm}$$, $$5.1\\text{ MHz}$$, and about $$12\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.17\\text{ mm}$$, $$1.1\\text{ MHz}$$, and about $$31\\%$$",
        },
        {
          correct: true,
          label:
            "$$0.77\\text{ mm}$$, $$5.1\\text{ MHz}$$, and about $$0.5\\%$$",
        },
        {
          correct: false,
          label: "$$0.77\\text{ mm}$$, $$5.1\\text{ MHz}$$, and about $$7\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.77\\text{ mm}$$, $$5.1\\text{ MHz}$$, and about $$12\\%$$",
        },
      ],
    },
  },
};

export default item;
