import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$23\\text{ kg}$$, and $$55\\text{ kPa}$$" },
        { correct: false, label: "$$20\\text{ kg}$$, and $$35\\text{ kPa}$$" },
        { correct: true, label: "$$14\\text{ kg}$$, and $$55\\text{ kPa}$$" },
        { correct: false, label: "$$14\\text{ kg}$$, and $$35\\text{ kPa}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$23\\text{ kg}$$, dan $$55\\text{ kPa}$$" },
        { correct: false, label: "$$20\\text{ kg}$$, dan $$35\\text{ kPa}$$" },
        { correct: true, label: "$$14\\text{ kg}$$, dan $$55\\text{ kPa}$$" },
        { correct: false, label: "$$14\\text{ kg}$$, dan $$35\\text{ kPa}$$" },
      ],
    },
  },
};

export default item;
