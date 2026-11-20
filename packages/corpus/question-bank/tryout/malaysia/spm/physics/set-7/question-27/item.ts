import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$8.2\\times10^{4}\\text{ Pa}$$, $$7.0\\text{ m}$$ and $$4.0\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$8.2\\times10^{4}\\text{ Pa}$$, $$7.0\\text{ m}$$ and $$2.5\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$9.4\\times10^{4}\\text{ Pa}$$, $$8.2\\text{ m}$$ and $$2.8\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$8.2\\times10^{4}\\text{ Pa}$$, $$9.4\\text{ m}$$ and $$1.6\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$8.2\\times10^{4}\\text{ Pa}$$, $$7.0\\text{ m}$$ dan $$4.0\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$8.2\\times10^{4}\\text{ Pa}$$, $$7.0\\text{ m}$$ dan $$2.5\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$9.4\\times10^{4}\\text{ Pa}$$, $$8.2\\text{ m}$$ dan $$2.8\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$8.2\\times10^{4}\\text{ Pa}$$, $$9.4\\text{ m}$$ dan $$1.6\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
