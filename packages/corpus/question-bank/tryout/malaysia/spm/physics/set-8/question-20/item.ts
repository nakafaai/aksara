import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$60°$$, $$2.0\\text{ m}$$ and $$2.6\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$83°$$, $$2.7\\text{ m}$$ and $$1.7\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$44°$$, $$1.5\\text{ m}$$ and $$3.7\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$44°$$, $$1.5\\text{ m}$$ and $$2.6\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$60°$$, $$2.0\\text{ m}$$ dan $$2.6\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$83°$$, $$2.7\\text{ m}$$ dan $$1.7\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$44°$$, $$1.5\\text{ m}$$ dan $$3.7\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$44°$$, $$1.5\\text{ m}$$ dan $$2.6\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
