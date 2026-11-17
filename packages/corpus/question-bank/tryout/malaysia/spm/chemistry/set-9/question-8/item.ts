import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Rubidium, $$25.0\\text{ cm}^3$$" },
        { correct: false, label: "Potassium, $$100\\text{ cm}^3$$" },
        { correct: true, label: "Potassium, $$50.0\\text{ cm}^3$$" },
        { correct: false, label: "Sodium, $$50.0\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Rubidium, $$25.0\\text{ cm}^3$$" },
        { correct: false, label: "Kalium, $$100\\text{ cm}^3$$" },
        { correct: true, label: "Kalium, $$50.0\\text{ cm}^3$$" },
        { correct: false, label: "Natrium, $$50.0\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
