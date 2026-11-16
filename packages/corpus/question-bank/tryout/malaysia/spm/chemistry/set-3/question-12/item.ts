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
        { correct: false, label: "R is an ionic compound, because its aqueous solution conducts electricity" },
        { correct: true, label: "Q has a giant covalent structure, so melting it breaks a very large number of strong covalent bonds" },
        { correct: false, label: "S conducts electricity because it has ions that move freely" },
        { correct: false, label: "P has the highest melting point, because its ions are held by strong electrostatic forces" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "R ialah sebatian ion, kerana larutan akueusnya mengkonduksikan elektrik" },
        { correct: true, label: "Q mempunyai struktur kovalen gergasi, jadi peleburannya memutuskan sangat banyak ikatan kovalen yang kuat" },
        { correct: false, label: "S mengkonduksikan elektrik kerana ia mempunyai ion yang bergerak bebas" },
        { correct: false, label: "P mempunyai takat lebur paling tinggi, kerana ionnya dipegang oleh daya elektrostatik yang kuat" },
      ],
    },
  },
};

export default item;
