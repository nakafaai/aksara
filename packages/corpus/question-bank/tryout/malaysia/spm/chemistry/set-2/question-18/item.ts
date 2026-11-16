import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "The covalent bond in hydrogen fluoride is the strongest of the four" },
        { correct: false, label: "Hydrogen fluoride has the largest relative molecular mass" },
        { correct: true, label: "Hydrogen bonds form between hydrogen fluoride molecules" },
        { correct: false, label: "Hydrogen fluoride ionises completely when it boils" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Ikatan kovalen dalam hidrogen fluorida paling kuat antara keempat-empatnya" },
        { correct: false, label: "Hidrogen fluorida mempunyai jisim molekul relatif paling besar" },
        { correct: true, label: "Ikatan hidrogen terbentuk antara molekul hidrogen fluorida" },
        { correct: false, label: "Hidrogen fluorida mengion dengan lengkap apabila mendidih" },
      ],
    },
  },
};

export default item;
