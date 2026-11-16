import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Ammonium sulfate, $$10.6\\text{ kg}$$" },
        { correct: false, label: "Ammonium nitrate, $$8.75\\text{ kg}$$" },
        { correct: false, label: "Urea, $$11.7\\text{ kg}$$" },
        { correct: true, label: "Urea, $$23.3\\text{ kg}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Ammonium sulfat, $$10.6\\text{ kg}$$" },
        { correct: false, label: "Ammonium nitrat, $$8.75\\text{ kg}$$" },
        { correct: false, label: "Urea, $$11.7\\text{ kg}$$" },
        { correct: true, label: "Urea, $$23.3\\text{ kg}$$" },
      ],
    },
  },
};

export default item;
