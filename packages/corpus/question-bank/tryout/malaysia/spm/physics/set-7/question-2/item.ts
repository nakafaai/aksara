import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "measurement",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$n=-2.5$$, $$32\\text{ s}$$ and $$3.9\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$n=-2$$, $$51\\text{ s}$$ and $$4.6\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$n=-2.5$$, $$32\\text{ s}$$ and $$1.0\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$n=-3$$, $$20\\text{ s}$$ and $$3.5\\text{ mm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$n=-2.5$$, $$32\\text{ s}$$ dan $$3.9\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$n=-2$$, $$51\\text{ s}$$ dan $$4.6\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$n=-2.5$$, $$32\\text{ s}$$ dan $$1.0\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$n=-3$$, $$20\\text{ s}$$ dan $$3.5\\text{ mm}$$",
        },
      ],
    },
  },
};

export default item;
