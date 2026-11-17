import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$880\\text{ Hz}$$, $$2.3\\text{ m}$$ and $$1.1\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$880\\text{ Hz}$$, $$1.5\\text{ m}$$ and $$0.75\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$880\\text{ Hz}$$, $$2.3\\text{ m}$$ and $$2.3\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$55\\text{ Hz}$$, $$2.3\\text{ m}$$ and $$1.1\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$880\\text{ Hz}$$, $$2.3\\text{ m}$$ dan $$1.1\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$880\\text{ Hz}$$, $$1.5\\text{ m}$$ dan $$0.75\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$880\\text{ Hz}$$, $$2.3\\text{ m}$$ dan $$2.3\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$55\\text{ Hz}$$, $$2.3\\text{ m}$$ dan $$1.1\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
