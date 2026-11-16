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
        { correct: false, label: "Magnesium gives 2.4 dm³ of hydrogen, because each acid molecule gives one hydrogen molecule" },
        { correct: false, label: "Magnesium gives 1.2 dm³ of hydrogen, and sodium carbonate gives 2.4 dm³ of carbon dioxide" },
        { correct: true, label: "Both give 1.2 dm³ of gas: hydrogen from magnesium and carbon dioxide from sodium carbonate" },
        { correct: false, label: "Both give 0.6 dm³ of gas, because ethanoic acid is a weak acid" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Magnesium menghasilkan 2.4 dm³ hidrogen, kerana setiap molekul asid menghasilkan satu molekul hidrogen" },
        { correct: false, label: "Magnesium menghasilkan 1.2 dm³ hidrogen, dan natrium karbonat menghasilkan 2.4 dm³ karbon dioksida" },
        { correct: true, label: "Kedua-duanya menghasilkan 1.2 dm³ gas: hidrogen daripada magnesium dan karbon dioksida daripada natrium karbonat" },
        { correct: false, label: "Kedua-duanya menghasilkan 0.6 dm³ gas, kerana asid etanoik ialah asid lemah" },
      ],
    },
  },
};

export default item;
