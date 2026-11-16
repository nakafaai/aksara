import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$143\\text{ kJ}$$ released" },
        { correct: false, label: "$$286\\text{ kJ}$$ absorbed" },
        { correct: true, label: "$$143\\text{ kJ}$$ absorbed" },
        { correct: false, label: "$$71.5\\text{ kJ}$$ absorbed" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$143\\text{ kJ}$$ dibebaskan" },
        { correct: false, label: "$$286\\text{ kJ}$$ diserap" },
        { correct: true, label: "$$143\\text{ kJ}$$ diserap" },
        { correct: false, label: "$$71.5\\text{ kJ}$$ diserap" },
      ],
    },
  },
};

export default item;
