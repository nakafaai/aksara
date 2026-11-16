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
        { correct: true, label: "Chlorine water and potassium bromide solution" },
        { correct: false, label: "Bromine water and potassium chloride solution" },
        { correct: false, label: "Iodine solution and potassium bromide solution" },
        { correct: false, label: "Iodine solution and potassium chloride solution" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Air klorin dan larutan kalium bromida" },
        { correct: false, label: "Air bromin dan larutan kalium klorida" },
        { correct: false, label: "Larutan iodin dan larutan kalium bromida" },
        { correct: false, label: "Larutan iodin dan larutan kalium klorida" },
      ],
    },
  },
};

export default item;
