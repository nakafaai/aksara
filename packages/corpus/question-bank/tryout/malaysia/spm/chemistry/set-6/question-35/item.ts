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
        { correct: false, label: "$$32.0\\text{ kg}$$, $$528\\text{ kg}$$" },
        { correct: false, label: "$$53.3\\text{ kg}$$, $$440\\text{ kg}$$" },
        { correct: false, label: "$$53.3\\text{ kg}$$, $$147\\text{ kg}$$" },
        { correct: true, label: "$$53.3\\text{ kg}$$, $$587\\text{ kg}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$32.0\\text{ kg}$$, $$528\\text{ kg}$$" },
        { correct: false, label: "$$53.3\\text{ kg}$$, $$440\\text{ kg}$$" },
        { correct: false, label: "$$53.3\\text{ kg}$$, $$147\\text{ kg}$$" },
        { correct: true, label: "$$53.3\\text{ kg}$$, $$587\\text{ kg}$$" },
      ],
    },
  },
};

export default item;
