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
          label: "$$1.0\\text{ m}$$, $$0.67\\text{ m}$$ and $$330\\text{ Hz}$$",
        },
        {
          correct: false,
          label: "$$2.0\\text{ m}$$, $$1.3\\text{ m}$$ and $$660\\text{ Hz}$$",
        },
        {
          correct: false,
          label: "$$1.0\\text{ m}$$, $$1.5\\text{ m}$$ and $$1320\\text{ Hz}$$",
        },
        {
          correct: false,
          label:
            "$$0.50\\text{ m}$$, $$0.33\\text{ m}$$ and $$165\\text{ Hz}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1.0\\text{ m}$$, $$0.67\\text{ m}$$ dan $$330\\text{ Hz}$$",
        },
        {
          correct: false,
          label: "$$2.0\\text{ m}$$, $$1.3\\text{ m}$$ dan $$660\\text{ Hz}$$",
        },
        {
          correct: false,
          label: "$$1.0\\text{ m}$$, $$1.5\\text{ m}$$ dan $$1320\\text{ Hz}$$",
        },
        {
          correct: false,
          label:
            "$$0.50\\text{ m}$$, $$0.33\\text{ m}$$ dan $$165\\text{ Hz}$$",
        },
      ],
    },
  },
};

export default item;
