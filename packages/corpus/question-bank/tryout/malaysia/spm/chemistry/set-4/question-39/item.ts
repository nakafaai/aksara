import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Fermentation has an atom economy of 100%, because yeast wastes nothing" },
        { correct: false, label: "Hydration has an atom economy of about 51%, because steam is a reactant" },
        { correct: false, label: "Both routes have an atom economy of 100%, because both make only ethanol" },
        { correct: true, label: "Hydration has an atom economy of 100% and fermentation about 51%, because fermentation also forms carbon dioxide" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Penapaian mempunyai ekonomi atom 100%, kerana yis tidak membazir" },
        { correct: false, label: "Penghidratan mempunyai ekonomi atom kira-kira 51%, kerana stim ialah bahan tindak balas" },
        { correct: false, label: "Kedua-dua kaedah mempunyai ekonomi atom 100%, kerana kedua-duanya hanya menghasilkan etanol" },
        { correct: true, label: "Penghidratan mempunyai ekonomi atom 100% dan penapaian kira-kira 51%, kerana penapaian juga menghasilkan karbon dioksida" },
      ],
    },
  },
};

export default item;
