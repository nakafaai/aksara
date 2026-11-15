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
          label: "$$275\\text{ Hz}$$",
        },
        {
          correct: false,
          label: "$$44\\text{ Hz}$$",
        },
        {
          correct: true,
          label: "$$1100\\text{ Hz}$$",
        },
        {
          correct: false,
          label: "$$2200\\text{ Hz}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$275\\text{ Hz}$$",
        },
        {
          correct: false,
          label: "$$44\\text{ Hz}$$",
        },
        {
          correct: true,
          label: "$$1100\\text{ Hz}$$",
        },
        {
          correct: false,
          label: "$$2200\\text{ Hz}$$",
        },
      ],
    },
  },
};

export default item;
