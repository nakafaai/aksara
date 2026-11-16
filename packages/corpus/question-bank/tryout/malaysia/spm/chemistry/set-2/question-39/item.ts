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
        { correct: false, label: "Detergent is made from petroleum, so it does not react with water" },
        { correct: false, label: "Soap is more acidic than detergent" },
        { correct: true, label: "The soap anions form an insoluble scum with calcium and magnesium ions, but the detergent anions do not" },
        { correct: false, label: "Hard water contains more hydrogen ions, which destroy the soap" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Detergen dibuat daripada petroleum, jadi ia tidak bertindak balas dengan air" },
        { correct: false, label: "Sabun lebih berasid daripada detergen" },
        { correct: true, label: "Anion sabun membentuk kekat tak terlarutkan dengan ion kalsium dan magnesium, tetapi anion detergen tidak" },
        { correct: false, label: "Air liat mengandungi lebih banyak ion hidrogen yang memusnahkan sabun" },
      ],
    },
  },
};

export default item;
