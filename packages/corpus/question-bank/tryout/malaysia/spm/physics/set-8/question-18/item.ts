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
          label: "$$37°$$, $$3.8\\text{ cm}$$ and $$4.5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$37°$$, $$4.8\\text{ cm}$$ and $$3.5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$53°$$, $$4.8\\text{ cm}$$ and $$4.5\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$37°$$, $$4.8\\text{ cm}$$ and $$4.5\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$37°$$, $$3.8\\text{ cm}$$ dan $$4.5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$37°$$, $$4.8\\text{ cm}$$ dan $$3.5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$53°$$, $$4.8\\text{ cm}$$ dan $$4.5\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$37°$$, $$4.8\\text{ cm}$$ dan $$4.5\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
