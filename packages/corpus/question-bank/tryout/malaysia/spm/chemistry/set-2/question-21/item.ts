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
        { correct: false, label: "Q is the most electropositive of the four metals" },
        { correct: true, label: "In a cell made of P and R, P is the negative terminal and the voltage is about 1.6 V" },
        { correct: false, label: "S can displace R from a solution of its salt" },
        { correct: false, label: "Copper is more electropositive than Q" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Q ialah logam paling elektropositif antara keempat-empatnya" },
        { correct: true, label: "Dalam sel yang terdiri daripada P dan R, P ialah terminal negatif dan voltannya kira-kira 1.6 V" },
        { correct: false, label: "S boleh menyesarkan R daripada larutan garamnya" },
        { correct: false, label: "Kuprum lebih elektropositif daripada Q" },
      ],
    },
  },
};

export default item;
