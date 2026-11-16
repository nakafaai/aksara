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
        { correct: false, label: "The strip gains mass because copper is deposited, and 3.2 g of copper forms" },
        { correct: false, label: "0.050 g of copper forms" },
        { correct: false, label: "3.25 g of copper forms" },
        { correct: true, label: "3.2 g of copper forms and 3.25 g of zinc dissolves" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Jalur bertambah jisim kerana kuprum terenap, dan 3.2 g kuprum terbentuk" },
        { correct: false, label: "0.050 g kuprum terbentuk" },
        { correct: false, label: "3.25 g kuprum terbentuk" },
        { correct: true, label: "3.2 g kuprum terbentuk dan 3.25 g zink melarut" },
      ],
    },
  },
};

export default item;
