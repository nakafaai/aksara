import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$300\\text{ N}$$ on each, moving $$6.7\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$1200\\text{ N}$$ on each, moving $$6.7\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$4800\\text{ N}$$ on each, moving $$1.7\\text{ mm}$$",
        },
        {
          correct: true,
          label: "$$1200\\text{ N}$$ on each, moving $$1.7\\text{ mm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$300\\text{ N}$$ pada setiap satu, bergerak $$6.7\\text{ mm}$$",
        },
        {
          correct: false,
          label:
            "$$1200\\text{ N}$$ pada setiap satu, bergerak $$6.7\\text{ mm}$$",
        },
        {
          correct: false,
          label:
            "$$4800\\text{ N}$$ pada setiap satu, bergerak $$1.7\\text{ mm}$$",
        },
        {
          correct: true,
          label:
            "$$1200\\text{ N}$$ pada setiap satu, bergerak $$1.7\\text{ mm}$$",
        },
      ],
    },
  },
};

export default item;
