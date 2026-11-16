import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$3200\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$4200\\text{ kJ mol}^{-1}$$" },
        { correct: true, label: "$$3540\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$2950\\text{ kJ mol}^{-1}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$3200\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$4200\\text{ kJ mol}^{-1}$$" },
        { correct: true, label: "$$3540\\text{ kJ mol}^{-1}$$" },
        { correct: false, label: "$$2950\\text{ kJ mol}^{-1}$$" },
      ],
    },
  },
};

export default item;
