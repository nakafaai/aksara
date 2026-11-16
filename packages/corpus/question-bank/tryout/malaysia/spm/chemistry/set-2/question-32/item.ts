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
        { correct: false, label: "Steam, phosphoric acid catalyst, $$300^\\circ\\text{C}$$ and $$60\\text{ atm}$$" },
        { correct: false, label: "Bromine water at room temperature" },
        { correct: false, label: "Acidified potassium manganate(VII) solution" },
        { correct: true, label: "Hydrogen gas, nickel catalyst and $$180^\\circ\\text{C}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Stim, mangkin asid fosforik, $$300^\\circ\\text{C}$$ dan $$60\\text{ atm}$$" },
        { correct: false, label: "Air bromin pada suhu bilik" },
        { correct: false, label: "Larutan kalium manganat(VII) berasid" },
        { correct: true, label: "Gas hidrogen, mangkin nikel dan $$180^\\circ\\text{C}$$" },
      ],
    },
  },
};

export default item;
