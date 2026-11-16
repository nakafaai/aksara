import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$100\\%$$" },
        { correct: false, label: "$$25.6\\%$$" },
        { correct: false, label: "$$48.9\\%$$" },
        { correct: true, label: "$$51.1\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$100\\%$$" },
        { correct: false, label: "$$25.6\\%$$" },
        { correct: false, label: "$$48.9\\%$$" },
        { correct: true, label: "$$51.1\\%$$" },
      ],
    },
  },
};

export default item;
