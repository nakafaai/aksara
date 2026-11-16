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
        { correct: false, label: "$$70.0\\%$$, $$0.96\\text{ dm}^3$$" },
        { correct: false, label: "$$27.4\\%$$, $$1.44\\text{ dm}^3$$" },
        { correct: true, label: "$$70.0\\%$$, $$1.44\\text{ dm}^3$$" },
        { correct: false, label: "$$35.0\\%$$, $$1.44\\text{ dm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$70.0\\%$$, $$0.96\\text{ dm}^3$$" },
        { correct: false, label: "$$27.4\\%$$, $$1.44\\text{ dm}^3$$" },
        { correct: true, label: "$$70.0\\%$$, $$1.44\\text{ dm}^3$$" },
        { correct: false, label: "$$35.0\\%$$, $$1.44\\text{ dm}^3$$" },
      ],
    },
  },
};

export default item;
