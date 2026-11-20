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
          correct: false,
          label:
            "$$0.20\\text{ s}$$, $$4.9\\text{ cm}$$ and $$0.112\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$0.21\\text{ s}$$, $$3.9\\text{ cm}$$ and $$0.090\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$0.21\\text{ s}$$, $$4.9\\text{ cm}$$ and $$0.120\\text{ s}$$",
        },
        {
          correct: true,
          label:
            "$$0.21\\text{ s}$$, $$3.9\\text{ cm}$$ and $$0.103\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.20\\text{ s}$$, $$4.9\\text{ cm}$$ dan $$0.112\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$0.21\\text{ s}$$, $$3.9\\text{ cm}$$ dan $$0.090\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$0.21\\text{ s}$$, $$4.9\\text{ cm}$$ dan $$0.120\\text{ s}$$",
        },
        {
          correct: true,
          label:
            "$$0.21\\text{ s}$$, $$3.9\\text{ cm}$$ dan $$0.103\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
