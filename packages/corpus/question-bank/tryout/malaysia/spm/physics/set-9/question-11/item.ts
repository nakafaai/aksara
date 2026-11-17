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
        { correct: true, label: "$$8.9\\text{ L}$$, and $$44\\text{ kPa}$$" },
        { correct: false, label: "$$10\\text{ L}$$, and $$50\\text{ kPa}$$" },
        { correct: false, label: "$$11\\text{ L}$$, and $$55\\text{ kPa}$$" },
        { correct: false, label: "$$8.9\\text{ L}$$, and $$50\\text{ kPa}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$8.9\\text{ L}$$, dan $$44\\text{ kPa}$$" },
        { correct: false, label: "$$10\\text{ L}$$, dan $$50\\text{ kPa}$$" },
        { correct: false, label: "$$11\\text{ L}$$, dan $$55\\text{ kPa}$$" },
        { correct: false, label: "$$8.9\\text{ L}$$, dan $$50\\text{ kPa}$$" },
      ],
    },
  },
};

export default item;
