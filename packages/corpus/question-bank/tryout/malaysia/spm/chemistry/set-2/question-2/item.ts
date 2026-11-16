import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$11\\%$$" },
        { correct: false, label: "$$10\\%$$" },
        { correct: false, label: "$$21\\%$$" },
        { correct: false, label: "$$5.5\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$11\\%$$" },
        { correct: false, label: "$$10\\%$$" },
        { correct: false, label: "$$21\\%$$" },
        { correct: false, label: "$$5.5\\%$$" },
      ],
    },
  },
};

export default item;
