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
        {
          correct: false,
          label: "$$\\text{XY}_4$$, ionic, dissolves in water",
        },
        {
          correct: false,
          label: "$$\\text{XY}_3$$, covalent, does not dissolve in water",
        },
        {
          correct: true,
          label: "$$\\text{XY}_4$$, covalent, does not dissolve in water",
        },
        {
          correct: false,
          label: "$$\\text{XY}_4$$, covalent, dissolves in water",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{XY}_4$$, ion, larut dalam air" },
        {
          correct: false,
          label: "$$\\text{XY}_3$$, kovalen, tidak larut dalam air",
        },
        {
          correct: true,
          label: "$$\\text{XY}_4$$, kovalen, tidak larut dalam air",
        },
        { correct: false, label: "$$\\text{XY}_4$$, kovalen, larut dalam air" },
      ],
    },
  },
};

export default item;
