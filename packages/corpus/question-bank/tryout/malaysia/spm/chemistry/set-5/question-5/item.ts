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
          label: "$$\\text{SnCl}_2$$, $$0.48\\text{ dm}^3$$, ionic",
        },
        {
          correct: false,
          label: "$$\\text{SnCl}_4$$, $$1.92\\text{ dm}^3$$, covalent",
        },
        {
          correct: true,
          label:
            "$$\\text{SnCl}_4$$, $$0.96\\text{ dm}^3$$, covalent molecules, so the liquid does not conduct",
        },
        {
          correct: false,
          label:
            "$$\\text{SnCl}_4$$, $$0.96\\text{ dm}^3$$, ionic, so the liquid conducts",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{SnCl}_2$$, $$0.48\\text{ dm}^3$$, ion",
        },
        {
          correct: false,
          label: "$$\\text{SnCl}_4$$, $$1.92\\text{ dm}^3$$, kovalen",
        },
        {
          correct: true,
          label:
            "$$\\text{SnCl}_4$$, $$0.96\\text{ dm}^3$$, molekul kovalen, jadi cecair itu tidak mengkonduksi",
        },
        {
          correct: false,
          label:
            "$$\\text{SnCl}_4$$, $$0.96\\text{ dm}^3$$, ion, jadi cecair itu mengkonduksi",
        },
      ],
    },
  },
};

export default item;
