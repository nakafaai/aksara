import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$35.0\\text{ g}$$, $$1.20\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$36.1\\text{ g}$$, $$0.616\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label: "$$36.1\\text{ g}$$, $$1.23\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$36.1\\text{ g}$$, $$2.46\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$35.0\\text{ g}$$, $$1.20\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$36.1\\text{ g}$$, $$0.616\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label: "$$36.1\\text{ g}$$, $$1.23\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$36.1\\text{ g}$$, $$2.46\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
