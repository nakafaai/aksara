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
        { correct: false, label: "<InlineMath math=\"\\text{HF}\" /> boils highest because its covalent bond is the strongest and must break when it boils" },
        { correct: false, label: "<InlineMath math=\"\\text{HCl}\" /> boils lowest because its molecules are the smallest of the four" },
        { correct: true, label: "<InlineMath math=\"\\text{HF}\" /> molecules form hydrogen bonds with each other, while from <InlineMath math=\"\\text{HCl}\" /> to <InlineMath math=\"\\text{HI}\" /> the boiling point rises with molecular size" },
        { correct: false, label: "<InlineMath math=\"\\text{HI}\" /> boils higher than <InlineMath math=\"\\text{HCl}\" /> because it is an ionic compound" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "<InlineMath math=\"\\text{HF}\" /> mendidih paling tinggi kerana ikatan kovalennya paling kuat dan mesti diputuskan semasa mendidih" },
        { correct: false, label: "<InlineMath math=\"\\text{HCl}\" /> mendidih paling rendah kerana molekulnya paling kecil antara empat" },
        { correct: true, label: "Molekul <InlineMath math=\"\\text{HF}\" /> membentuk ikatan hidrogen sesama sendiri, manakala daripada <InlineMath math=\"\\text{HCl}\" /> kepada <InlineMath math=\"\\text{HI}\" /> takat didih naik dengan saiz molekul" },
        { correct: false, label: "<InlineMath math=\"\\text{HI}\" /> mendidih lebih tinggi daripada <InlineMath math=\"\\text{HCl}\" /> kerana ia sebatian ion" },
      ],
    },
  },
};

export default item;
