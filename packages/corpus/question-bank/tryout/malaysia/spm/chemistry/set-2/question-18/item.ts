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
        { correct: false, label: "Hydrogen telluride boils highest of the three heavier hydrides because its covalent bonds are the strongest" },
        { correct: false, label: "Water boils at $$100^\\circ\\text{C}$$ because its molecules are the heaviest of the four" },
        { correct: true, label: "Without hydrogen bonds, water would be expected to boil below $$-60^\\circ\\text{C}$$, because the boiling point falls with molecular size from $$\\text{H}_2\\text{Te}$$ to $$\\text{H}_2\\text{S}$$" },
        { correct: false, label: "Water boils at $$100^\\circ\\text{C}$$ because its $$\\text{O-H}$$ covalent bonds break as it boils" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Hidrogen telurida mendidih paling tinggi antara tiga hidrida yang lebih berat kerana ikatan kovalennya paling kuat" },
        { correct: false, label: "Air mendidih pada $$100^\\circ\\text{C}$$ kerana molekulnya paling berat antara keempat-empatnya" },
        { correct: true, label: "Tanpa ikatan hidrogen, air dijangka mendidih di bawah $$-60^\\circ\\text{C}$$, kerana takat didih menurun dengan saiz molekul daripada $$\\text{H}_2\\text{Te}$$ kepada $$\\text{H}_2\\text{S}$$" },
        { correct: false, label: "Air mendidih pada $$100^\\circ\\text{C}$$ kerana ikatan kovalen $$\\text{O-H}$$ terputus apabila ia mendidih" },
      ],
    },
  },
};

export default item;
