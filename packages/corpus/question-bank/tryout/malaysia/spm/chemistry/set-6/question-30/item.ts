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
        { correct: true, label: "P ethanol, Q propanoic acid, R hex-1-ene" },
        {
          correct: false,
          label: "P propan-1-ol, Q propanoic acid, R hex-1-ene",
        },
        { correct: false, label: "P ethanol, Q ethanoic acid, R hex-1-ene" },
        { correct: false, label: "P ethanol, Q propanoic acid, R pent-1-ene" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "P etanol, Q asid propanoik, R heks-1-ena" },
        {
          correct: false,
          label: "P propan-1-ol, Q asid propanoik, R heks-1-ena",
        },
        { correct: false, label: "P etanol, Q asid etanoik, R heks-1-ena" },
        { correct: false, label: "P etanol, Q asid propanoik, R pent-1-ena" },
      ],
    },
  },
};

export default item;
