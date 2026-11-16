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
        { correct: false, label: "$$40\\%$$" },
        { correct: false, label: "$$96\\%$$" },
        { correct: false, label: "$$20\\%$$" },
        { correct: true, label: "$$80\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$40\\%$$" },
        { correct: false, label: "$$96\\%$$" },
        { correct: false, label: "$$20\\%$$" },
        { correct: true, label: "$$80\\%$$" },
      ],
    },
  },
};

export default item;
