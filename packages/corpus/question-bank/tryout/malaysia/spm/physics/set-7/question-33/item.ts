import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.50\\text{ N}$$, $$2.5\\text{ mm}$$ and $$1.5\\text{ V}$$",
        },
        {
          correct: false,
          label:
            "$$0.50\\text{ N}$$, $$0.25\\text{ mm}$$ and $$1.6\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$1.0\\text{ N}$$, $$5.0\\text{ mm}$$ and $$0.64\\text{ V}$$",
        },
        {
          correct: true,
          label: "$$0.50\\text{ N}$$, $$2.5\\text{ mm}$$ and $$1.3\\text{ V}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.50\\text{ N}$$, $$2.5\\text{ mm}$$ dan $$1.5\\text{ V}$$",
        },
        {
          correct: false,
          label:
            "$$0.50\\text{ N}$$, $$0.25\\text{ mm}$$ dan $$1.6\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$1.0\\text{ N}$$, $$5.0\\text{ mm}$$ dan $$0.64\\text{ V}$$",
        },
        {
          correct: true,
          label: "$$0.50\\text{ N}$$, $$2.5\\text{ mm}$$ dan $$1.3\\text{ V}$$",
        },
      ],
    },
  },
};

export default item;
