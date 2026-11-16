import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "Halogen P water and potassium R solution" },
        { correct: false, label: "Halogen R water and potassium Q solution" },
        { correct: false, label: "Halogen Q water and potassium P solution" },
        { correct: false, label: "Halogen R water and potassium P solution" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Air halogen P dan larutan kalium R" },
        { correct: false, label: "Air halogen R dan larutan kalium Q" },
        { correct: false, label: "Air halogen Q dan larutan kalium P" },
        { correct: false, label: "Air halogen R dan larutan kalium P" },
      ],
    },
  },
};

export default item;
