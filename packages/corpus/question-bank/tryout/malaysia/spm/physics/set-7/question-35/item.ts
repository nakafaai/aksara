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
          label:
            "$$3.8\\text{ ns}$$, $$19\\text{ ns}$$, $$9.4\\text{ ns}$$ and $$45\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$7.5\\text{ ns}$$, $$23\\text{ ns}$$, $$5.6\\text{ ns}$$ and $$110\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$11\\text{ ns}$$, $$32\\text{ ns}$$, $$16\\text{ ns}$$ and $$50\\text{ cm}$$",
        },
        {
          correct: true,
          label:
            "$$7.5\\text{ ns}$$, $$23\\text{ ns}$$, $$11\\text{ ns}$$ and $$50\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.8\\text{ ns}$$, $$19\\text{ ns}$$, $$9.4\\text{ ns}$$ dan $$45\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$7.5\\text{ ns}$$, $$23\\text{ ns}$$, $$5.6\\text{ ns}$$ dan $$110\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$11\\text{ ns}$$, $$32\\text{ ns}$$, $$16\\text{ ns}$$ dan $$50\\text{ cm}$$",
        },
        {
          correct: true,
          label:
            "$$7.5\\text{ ns}$$, $$23\\text{ ns}$$, $$11\\text{ ns}$$ dan $$50\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
