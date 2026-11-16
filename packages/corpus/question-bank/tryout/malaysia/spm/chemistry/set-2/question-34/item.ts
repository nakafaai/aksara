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
        { correct: false, label: "The process is exothermic because heat is released to the surroundings" },
        { correct: true, label: "The products have more energy than the reactants, because heat is absorbed from the surroundings" },
        { correct: false, label: "The temperature falls because the solution loses heat to the air" },
        { correct: false, label: "Less energy is absorbed to break bonds than is released when new bonds form" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Proses itu eksotermik kerana haba dibebaskan ke persekitaran" },
        { correct: true, label: "Hasil mempunyai lebih banyak tenaga daripada bahan, kerana haba diserap daripada persekitaran" },
        { correct: false, label: "Suhu menurun kerana larutan kehilangan haba ke udara" },
        { correct: false, label: "Tenaga yang diserap untuk memecahkan ikatan kurang daripada tenaga yang dibebaskan apabila ikatan baharu terbentuk" },
      ],
    },
  },
};

export default item;
