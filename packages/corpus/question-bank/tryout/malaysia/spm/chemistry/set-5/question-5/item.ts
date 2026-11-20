import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{SnCl}_2$$, $$3.80\\text{ g}$$, ionic",
        },
        {
          correct: false,
          label:
            "$$\\text{SnCl}_4$$, $$5.93\\text{ g}$$, covalent molecules, so the liquid does not conduct",
        },
        {
          correct: true,
          label:
            "$$\\text{SnCl}_4$$, $$5.22\\text{ g}$$, covalent molecules, so the liquid does not conduct",
        },
        {
          correct: false,
          label:
            "$$\\text{SnCl}_4$$, $$5.22\\text{ g}$$, ionic, so the liquid conducts",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{SnCl}_2$$, $$3.80\\text{ g}$$, ion",
        },
        {
          correct: false,
          label:
            "$$\\text{SnCl}_4$$, $$5.93\\text{ g}$$, molekul kovalen, jadi cecair itu tidak mengkonduksi",
        },
        {
          correct: true,
          label:
            "$$\\text{SnCl}_4$$, $$5.22\\text{ g}$$, molekul kovalen, jadi cecair itu tidak mengkonduksi",
        },
        {
          correct: false,
          label:
            "$$\\text{SnCl}_4$$, $$5.22\\text{ g}$$, ion, jadi cecair itu mengkonduksi",
        },
      ],
    },
  },
};

export default item;
