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
        { correct: true, label: "Argon, $$1920\\text{ dm}^3$$" },
        { correct: false, label: "Nitrogen, $$2740\\text{ dm}^3$$" },
        { correct: false, label: "Helium, $$19\\,200\\text{ dm}^3$$" },
        { correct: false, label: "Argon, $$960\\text{ dm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Argon, $$1920\\text{ dm}^3$$" },
        { correct: false, label: "Nitrogen, $$2740\\text{ dm}^3$$" },
        { correct: false, label: "Helium, $$19\\,200\\text{ dm}^3$$" },
        { correct: false, label: "Argon, $$960\\text{ dm}^3$$" },
      ],
    },
  },
};

export default item;
