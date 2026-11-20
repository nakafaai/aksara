import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.71\\text{ s}$$, $$0.33\\text{ m}$$ below and $$0.46\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$0.71\\text{ s}$$, $$2.45\\text{ m}$$ below and $$0\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$0.46\\text{ s}$$, $$1.1\\text{ m}$$ below and $$0\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$0.71\\text{ s}$$, $$0.33\\text{ m}$$ below and $$0\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.71\\text{ s}$$, $$0.33\\text{ m}$$ di bawah dan $$0.46\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$0.71\\text{ s}$$, $$2.45\\text{ m}$$ di bawah dan $$0\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$0.46\\text{ s}$$, $$1.1\\text{ m}$$ di bawah dan $$0\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$0.71\\text{ s}$$, $$0.33\\text{ m}$$ di bawah dan $$0\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
