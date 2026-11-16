import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "transport-in-humans-and-animals",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Y only" },
        { correct: false, label: "X and Z only" },
        { correct: true, label: "Y and Z only" },
        { correct: false, label: "W, Y and Z only" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Y sahaja" },
        { correct: false, label: "X dan Z sahaja" },
        { correct: true, label: "Y dan Z sahaja" },
        { correct: false, label: "W, Y dan Z sahaja" },
      ],
    },
  },
};

export default item;
