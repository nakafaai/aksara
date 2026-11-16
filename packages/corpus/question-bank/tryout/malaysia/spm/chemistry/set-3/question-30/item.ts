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
        { correct: false, label: "X is ethene, which decolourises bromine water" },
        { correct: true, label: "X is ethanoic acid, which reacts with calcium carbonate to give a gas that turns limewater chalky" },
        { correct: false, label: "X is ethyl ethanoate, which has a sweet fruity smell" },
        { correct: false, label: "X decolourises the purple solution, because X is the reducing agent" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "X ialah etena, yang menyahwarnakan air bromin" },
        { correct: true, label: "X ialah asid etanoik, yang bertindak balas dengan kalsium karbonat menghasilkan gas yang mengeruhkan air kapur" },
        { correct: false, label: "X ialah etil etanoat, yang berbau wangi buah-buahan" },
        { correct: false, label: "X menyahwarnakan larutan ungu, kerana X ialah agen penurunan" },
      ],
    },
  },
};

export default item;
