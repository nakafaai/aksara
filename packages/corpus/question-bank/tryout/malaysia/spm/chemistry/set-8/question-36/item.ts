import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$55.5\\text{ kJ}$$ released" },
        { correct: false, label: "$$55.5\\text{ kJ}$$ absorbed" },
        { correct: false, label: "$$2220\\text{ kJ}$$ released" },
        { correct: false, label: "$$111\\text{ kJ}$$ released" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$55.5\\text{ kJ}$$ dibebaskan" },
        { correct: false, label: "$$55.5\\text{ kJ}$$ diserap" },
        { correct: false, label: "$$2220\\text{ kJ}$$ dibebaskan" },
        { correct: false, label: "$$111\\text{ kJ}$$ dibebaskan" },
      ],
    },
  },
};

export default item;
