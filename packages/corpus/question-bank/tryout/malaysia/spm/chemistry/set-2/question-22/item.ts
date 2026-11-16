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
        { correct: true, label: "$$2\\text{FeCl}_2 + \\text{Cl}_2 \\rightarrow 2\\text{FeCl}_3$$" },
        { correct: false, label: "$$\\text{FeO} + 2\\text{HCl} \\rightarrow \\text{FeCl}_2 + \\text{H}_2\\text{O}$$" },
        { correct: false, label: "$$\\text{Fe} + \\text{CuSO}_4 \\rightarrow \\text{FeSO}_4 + \\text{Cu}$$" },
        { correct: false, label: "$$\\text{FeCl}_3 + 3\\text{NaOH} \\rightarrow \\text{Fe(OH)}_3 + 3\\text{NaCl}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$2\\text{FeCl}_2 + \\text{Cl}_2 \\rightarrow 2\\text{FeCl}_3$$" },
        { correct: false, label: "$$\\text{FeO} + 2\\text{HCl} \\rightarrow \\text{FeCl}_2 + \\text{H}_2\\text{O}$$" },
        { correct: false, label: "$$\\text{Fe} + \\text{CuSO}_4 \\rightarrow \\text{FeSO}_4 + \\text{Cu}$$" },
        { correct: false, label: "$$\\text{FeCl}_3 + 3\\text{NaOH} \\rightarrow \\text{Fe(OH)}_3 + 3\\text{NaCl}$$" },
      ],
    },
  },
};

export default item;
