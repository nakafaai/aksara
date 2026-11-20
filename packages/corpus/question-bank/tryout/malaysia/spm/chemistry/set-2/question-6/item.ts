import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.0100\\text{ mol}$$, $$0.00500\\text{ mol}$$, $$7.0$$",
        },
        {
          correct: false,
          label: "$$0.0200\\text{ mol}$$, $$0.00500\\text{ mol}$$, $$12.6$$",
        },
        {
          correct: true,
          label: "$$0.0200\\text{ mol}$$, $$0.00500\\text{ mol}$$, $$12.3$$",
        },
        {
          correct: false,
          label: "$$0.0200\\text{ mol}$$, $$0.00500\\text{ mol}$$, $$12.5$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.0100\\text{ mol}$$, $$0.00500\\text{ mol}$$, $$7.0$$",
        },
        {
          correct: false,
          label: "$$0.0200\\text{ mol}$$, $$0.00500\\text{ mol}$$, $$12.6$$",
        },
        {
          correct: true,
          label: "$$0.0200\\text{ mol}$$, $$0.00500\\text{ mol}$$, $$12.3$$",
        },
        {
          correct: false,
          label: "$$0.0200\\text{ mol}$$, $$0.00500\\text{ mol}$$, $$12.5$$",
        },
      ],
    },
  },
};

export default item;
