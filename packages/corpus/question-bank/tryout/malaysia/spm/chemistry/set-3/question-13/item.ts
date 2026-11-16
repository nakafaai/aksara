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
        { correct: false, label: "$$\\text{HF}$$ boils highest because its covalent bond is the strongest and must break when it boils" },
        { correct: false, label: "$$\\text{HCl}$$ boils lowest because its molecules are the smallest of the four" },
        { correct: true, label: "$$\\text{HF}$$ molecules form hydrogen bonds with each other, while from $$\\text{HCl}$$ to $$\\text{HI}$$ the boiling point rises with molecular size" },
        { correct: false, label: "$$\\text{HI}$$ boils higher than $$\\text{HCl}$$ because it is an ionic compound" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{HF}$$ mendidih paling tinggi kerana ikatan kovalennya paling kuat dan mesti diputuskan semasa mendidih" },
        { correct: false, label: "$$\\text{HCl}$$ mendidih paling rendah kerana molekulnya paling kecil antara empat" },
        { correct: true, label: "Molekul $$\\text{HF}$$ membentuk ikatan hidrogen sesama sendiri, manakala daripada $$\\text{HCl}$$ kepada $$\\text{HI}$$ takat didih naik dengan saiz molekul" },
        { correct: false, label: "$$\\text{HI}$$ mendidih lebih tinggi daripada $$\\text{HCl}$$ kerana ia sebatian ion" },
      ],
    },
  },
};

export default item;
