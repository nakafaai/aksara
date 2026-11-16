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
        { correct: true, label: "Order P, R, Q, and 6.4 g of Q forms" },
        { correct: false, label: "Order R, P, Q, and 6.4 g of Q forms" },
        { correct: false, label: "Order P, R, Q, and 2.4 g of Q forms" },
        { correct: false, label: "Order P, Q, R, and 3.2 g of Q forms" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Susunan P, R, Q, dan 6.4 g Q terbentuk" },
        { correct: false, label: "Susunan R, P, Q, dan 6.4 g Q terbentuk" },
        { correct: false, label: "Susunan P, R, Q, dan 2.4 g Q terbentuk" },
        { correct: false, label: "Susunan P, Q, R, dan 3.2 g Q terbentuk" },
      ],
    },
  },
};

export default item;
