import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$1.24\\text{ g}$$, $$0.795\\text{ g}$$, $$240\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.48\\text{ g}$$, $$0.954\\text{ g}$$, $$288\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.24\\text{ g}$$, $$0.795\\text{ g}$$, $$480\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.24\\text{ g}$$, $$0.635\\text{ g}$$, $$240\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$1.24\\text{ g}$$, $$0.795\\text{ g}$$, $$240\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.48\\text{ g}$$, $$0.954\\text{ g}$$, $$288\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.24\\text{ g}$$, $$0.795\\text{ g}$$, $$480\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.24\\text{ g}$$, $$0.635\\text{ g}$$, $$240\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
