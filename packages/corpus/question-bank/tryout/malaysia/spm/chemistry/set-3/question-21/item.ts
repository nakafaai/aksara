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
        { correct: true, label: "Manganese is reduced from +7 to +2, and hydrochloric acid is the reducing agent" },
        { correct: false, label: "Manganese is oxidised from +7 to +2, and potassium manganate(VII) is the reducing agent" },
        { correct: false, label: "Chlorine is reduced from −1 to 0, and hydrochloric acid is the oxidising agent" },
        { correct: false, label: "Potassium is oxidised, because it moves from potassium manganate(VII) to potassium chloride" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Mangan diturunkan daripada +7 kepada +2, dan asid hidroklorik ialah agen penurunan" },
        { correct: false, label: "Mangan dioksidakan daripada +7 kepada +2, dan kalium manganat(VII) ialah agen penurunan" },
        { correct: false, label: "Klorin diturunkan daripada −1 kepada 0, dan asid hidroklorik ialah agen pengoksidaan" },
        { correct: false, label: "Kalium dioksidakan, kerana ia berpindah daripada kalium manganat(VII) kepada kalium klorida" },
      ],
    },
  },
};

export default item;
