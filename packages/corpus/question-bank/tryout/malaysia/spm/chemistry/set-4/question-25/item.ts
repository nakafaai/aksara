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
        { correct: false, label: "1.12 tonnes of iron, with carbon monoxide as the oxidising agent" },
        { correct: false, label: "0.896 tonnes of iron, with iron(III) oxide as the reducing agent" },
        { correct: true, label: "0.896 tonnes of iron, with carbon monoxide as the reducing agent" },
        { correct: false, label: "0.448 tonnes of iron, with carbon monoxide as the reducing agent" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "1.12 tan ferum, dengan karbon monoksida sebagai agen pengoksidaan" },
        { correct: false, label: "0.896 tan ferum, dengan ferum(III) oksida sebagai agen penurunan" },
        { correct: true, label: "0.896 tan ferum, dengan karbon monoksida sebagai agen penurunan" },
        { correct: false, label: "0.448 tan ferum, dengan karbon monoksida sebagai agen penurunan" },
      ],
    },
  },
};

export default item;
