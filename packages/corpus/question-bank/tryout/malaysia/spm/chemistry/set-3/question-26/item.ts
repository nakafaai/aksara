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
        { correct: false, label: "Each iron(II) ion gains one electron" },
        { correct: false, label: "Bromine acts as the reducing agent" },
        { correct: false, label: "One mole of bromine accepts one mole of electrons" },
        { correct: true, label: "Iron(II) ions are oxidised, and one mole of bromine accepts two moles of electrons" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Setiap ion ferum(II) menerima satu elektron" },
        { correct: false, label: "Bromin bertindak sebagai agen penurunan" },
        { correct: false, label: "Satu mol bromin menerima satu mol elektron" },
        { correct: true, label: "Ion ferum(II) dioksidakan, dan satu mol bromin menerima dua mol elektron" },
      ],
    },
  },
};

export default item;
