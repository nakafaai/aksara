import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.50\\text{ mm}$$, $$3.2\\text{ mm}$$ and $$3.5\\times10^{14}\\text{ Hz}$$",
        },
        {
          correct: false,
          label:
            "$$0.50\\text{ mm}$$, $$4.3\\text{ mm}$$ and $$4.7\\times10^{14}\\text{ Hz}$$",
        },
        {
          correct: true,
          label:
            "$$0.50\\text{ mm}$$, $$2.4\\text{ mm}$$ and $$4.7\\times10^{14}\\text{ Hz}$$",
        },
        {
          correct: false,
          label:
            "$$0.50\\text{ mm}$$, $$2.4\\text{ mm}$$ and $$3.5\\times10^{14}\\text{ Hz}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.50\\text{ mm}$$, $$3.2\\text{ mm}$$ dan $$3.5\\times10^{14}\\text{ Hz}$$",
        },
        {
          correct: false,
          label:
            "$$0.50\\text{ mm}$$, $$4.3\\text{ mm}$$ dan $$4.7\\times10^{14}\\text{ Hz}$$",
        },
        {
          correct: true,
          label:
            "$$0.50\\text{ mm}$$, $$2.4\\text{ mm}$$ dan $$4.7\\times10^{14}\\text{ Hz}$$",
        },
        {
          correct: false,
          label:
            "$$0.50\\text{ mm}$$, $$2.4\\text{ mm}$$ dan $$3.5\\times10^{14}\\text{ Hz}$$",
        },
      ],
    },
  },
};

export default item;
