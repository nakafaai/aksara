import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.0\\text{ m}$$, taking $$1.0\\text{ s}$$",
        },
        { correct: true, label: "$$4.5\\text{ m}$$, taking $$1.5\\text{ s}$$" },
        {
          correct: false,
          label: "$$9.0\\text{ m}$$, taking $$3.0\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$4.5\\text{ m}$$, taking $$0.75\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.0\\text{ m}$$, mengambil masa $$1.0\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$4.5\\text{ m}$$, mengambil masa $$1.5\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$9.0\\text{ m}$$, mengambil masa $$3.0\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$4.5\\text{ m}$$, mengambil masa $$0.75\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
