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
          label:
            "$$880\\text{ Hz}$$, $$2.3\\text{ m}$$, $$1.1\\text{ m}$$ and $$5$$",
        },
        {
          correct: false,
          label:
            "$$880\\text{ Hz}$$, $$1.5\\text{ m}$$, $$0.75\\text{ m}$$ and $$7$$",
        },
        {
          correct: false,
          label:
            "$$880\\text{ Hz}$$, $$2.3\\text{ m}$$, $$2.3\\text{ m}$$ and $$5$$",
        },
        {
          correct: false,
          label:
            "$$55\\text{ Hz}$$, $$2.3\\text{ m}$$, $$1.1\\text{ m}$$ and $$1$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$880\\text{ Hz}$$, $$2.3\\text{ m}$$, $$1.1\\text{ m}$$ dan $$5$$",
        },
        {
          correct: false,
          label:
            "$$880\\text{ Hz}$$, $$1.5\\text{ m}$$, $$0.75\\text{ m}$$ dan $$7$$",
        },
        {
          correct: false,
          label:
            "$$880\\text{ Hz}$$, $$2.3\\text{ m}$$, $$2.3\\text{ m}$$ dan $$5$$",
        },
        {
          correct: false,
          label:
            "$$55\\text{ Hz}$$, $$2.3\\text{ m}$$, $$1.1\\text{ m}$$ dan $$1$$",
        },
      ],
    },
  },
};

export default item;
