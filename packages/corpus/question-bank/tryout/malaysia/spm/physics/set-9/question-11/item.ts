import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$8.3\\text{ L}$$, and $$40\\text{ kPa}$$" },
        { correct: false, label: "$$10\\text{ L}$$, and $$50\\text{ kPa}$$" },
        { correct: false, label: "$$8.3\\text{ L}$$, and $$42\\text{ kPa}$$" },
        { correct: false, label: "$$12\\text{ L}$$, and $$63\\text{ kPa}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$8.3\\text{ L}$$, dan $$40\\text{ kPa}$$" },
        { correct: false, label: "$$10\\text{ L}$$, dan $$50\\text{ kPa}$$" },
        { correct: false, label: "$$8.3\\text{ L}$$, dan $$42\\text{ kPa}$$" },
        { correct: false, label: "$$12\\text{ L}$$, dan $$63\\text{ kPa}$$" },
      ],
    },
  },
};

export default item;
