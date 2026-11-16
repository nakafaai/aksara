import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "Hydrogen gives the most heat per gram, about 143 kJ, and forms no carbon dioxide" },
        { correct: false, label: "Octane gives the most heat per gram, because it has the largest heat of combustion per mole" },
        { correct: false, label: "Methanol gives the most heat per gram, because its molecules are the lightest of the carbon fuels" },
        { correct: false, label: "Ethanol gives the most heat per gram, about 29.9 kJ, and forms no carbon dioxide" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Hidrogen membebaskan haba paling banyak per gram, kira-kira 143 kJ, dan tidak menghasilkan karbon dioksida" },
        { correct: false, label: "Oktana membebaskan haba paling banyak per gram, kerana haba pembakarannya per mol paling besar" },
        { correct: false, label: "Metanol membebaskan haba paling banyak per gram, kerana molekulnya paling ringan antara bahan api karbon" },
        { correct: false, label: "Etanol membebaskan haba paling banyak per gram, kira-kira 29.9 kJ, dan tidak menghasilkan karbon dioksida" },
      ],
    },
  },
};

export default item;
