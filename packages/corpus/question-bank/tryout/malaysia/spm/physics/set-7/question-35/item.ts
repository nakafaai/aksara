import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.8\\text{ ns}$$, $$19\\text{ ns}$$ and $$9.4\\text{ ns}$$",
        },
        {
          correct: false,
          label: "$$7.5\\text{ ns}$$, $$23\\text{ ns}$$ and $$5.6\\text{ ns}$$",
        },
        {
          correct: false,
          label: "$$11\\text{ ns}$$, $$32\\text{ ns}$$ and $$16\\text{ ns}$$",
        },
        {
          correct: true,
          label: "$$7.5\\text{ ns}$$, $$23\\text{ ns}$$ and $$11\\text{ ns}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.8\\text{ ns}$$, $$19\\text{ ns}$$ dan $$9.4\\text{ ns}$$",
        },
        {
          correct: false,
          label: "$$7.5\\text{ ns}$$, $$23\\text{ ns}$$ dan $$5.6\\text{ ns}$$",
        },
        {
          correct: false,
          label: "$$11\\text{ ns}$$, $$32\\text{ ns}$$ dan $$16\\text{ ns}$$",
        },
        {
          correct: true,
          label: "$$7.5\\text{ ns}$$, $$23\\text{ ns}$$ dan $$11\\text{ ns}$$",
        },
      ],
    },
  },
};

export default item;
