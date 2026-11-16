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
        {
          correct: false,
          label: "$$97.6\\%$$, the blue colour stays the same",
        },
        {
          correct: false,
          label: "$$87.8\\%$$, the blue colour stays the same",
        },
        {
          correct: false,
          label: "$$97.6\\%$$, the blue colour fades slightly",
        },
        { correct: true, label: "$$87.8\\%$$, the blue colour fades slightly" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$97.6\\%$$, warna biru kekal sama" },
        { correct: false, label: "$$87.8\\%$$, warna biru kekal sama" },
        { correct: false, label: "$$97.6\\%$$, warna biru pudar sedikit" },
        { correct: true, label: "$$87.8\\%$$, warna biru pudar sedikit" },
      ],
    },
  },
};

export default item;
