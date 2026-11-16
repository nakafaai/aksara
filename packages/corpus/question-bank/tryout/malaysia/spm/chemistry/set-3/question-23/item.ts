import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "3.8 V, and electrons flow through the wire from zinc to magnesium" },
        { correct: true, label: "1.6 V, electrons flow through the wire from magnesium to zinc, and the magnesium electrode loses mass" },
        { correct: false, label: "1.6 V, electrons flow through the wire from zinc to magnesium, and the zinc electrode loses mass" },
        { correct: false, label: "1.9 V, and the magnesium electrode loses mass" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "3.8 V, dan elektron mengalir melalui wayar dari zink ke magnesium" },
        { correct: true, label: "1.6 V, elektron mengalir melalui wayar dari magnesium ke zink, dan elektrod magnesium kehilangan jisim" },
        { correct: false, label: "1.6 V, elektron mengalir melalui wayar dari zink ke magnesium, dan elektrod zink kehilangan jisim" },
        { correct: false, label: "1.9 V, dan elektrod magnesium kehilangan jisim" },
      ],
    },
  },
};

export default item;
