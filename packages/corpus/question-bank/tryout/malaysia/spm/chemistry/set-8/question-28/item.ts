import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Ethyl ethanoate, $$10.0\\text{ cm}^3$$" },
        { correct: false, label: "Methyl propanoate, $$20.0\\text{ cm}^3$$" },
        { correct: true, label: "Ethyl ethanoate, $$20.0\\text{ cm}^3$$" },
        { correct: false, label: "Ethyl ethanoate, $$200\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Etil etanoat, $$10.0\\text{ cm}^3$$" },
        { correct: false, label: "Metil propanoat, $$20.0\\text{ cm}^3$$" },
        { correct: true, label: "Etil etanoat, $$20.0\\text{ cm}^3$$" },
        { correct: false, label: "Etil etanoat, $$200\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
