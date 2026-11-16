import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$720\\text{ cm}^3$$" },
        { correct: false, label: "$$840\\text{ cm}^3$$" },
        { correct: false, label: "$$1440\\text{ cm}^3$$" },
        { correct: false, label: "$$1680\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$720\\text{ cm}^3$$" },
        { correct: false, label: "$$840\\text{ cm}^3$$" },
        { correct: false, label: "$$1440\\text{ cm}^3$$" },
        { correct: false, label: "$$1680\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
