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
        { correct: true, label: "$$-1050\\text{ kJ mol}^{-1}$$, $$23.4\\%$$" },
        { correct: false, label: "$$-1050\\text{ kJ mol}^{-1}$$, $$30.5\\%$$" },
        { correct: false, label: "$$-1050\\text{ kJ mol}^{-1}$$, $$76.6\\%$$" },
        { correct: false, label: "$$-21.0\\text{ kJ mol}^{-1}$$, $$98.5\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$-1050\\text{ kJ mol}^{-1}$$, $$23.4\\%$$" },
        { correct: false, label: "$$-1050\\text{ kJ mol}^{-1}$$, $$30.5\\%$$" },
        { correct: false, label: "$$-1050\\text{ kJ mol}^{-1}$$, $$76.6\\%$$" },
        { correct: false, label: "$$-21.0\\text{ kJ mol}^{-1}$$, $$98.5\\%$$" },
      ],
    },
  },
};

export default item;
