import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "Hydrogen chloride ionises completely in water, so its concentration of hydrogen ions is higher" },
        { correct: false, label: "Ethanoic acid has fewer hydrogen atoms in each molecule" },
        { correct: false, label: "The hydrochloric acid solutions are more concentrated than the ethanoic acid solutions" },
        { correct: false, label: "Ethanoic acid is a covalent compound, so it produces no hydrogen ions in water" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Hidrogen klorida mengion dengan lengkap dalam air, jadi kepekatan ion hidrogennya lebih tinggi" },
        { correct: false, label: "Asid etanoik mempunyai lebih sedikit atom hidrogen dalam setiap molekul" },
        { correct: false, label: "Larutan asid hidroklorik lebih pekat daripada larutan asid etanoik" },
        { correct: false, label: "Asid etanoik ialah sebatian kovalen, jadi ia tidak menghasilkan ion hidrogen dalam air" },
      ],
    },
  },
};

export default item;
