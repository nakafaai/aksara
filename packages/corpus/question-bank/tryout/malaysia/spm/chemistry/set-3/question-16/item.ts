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
        { correct: false, label: "Hydrochloric acid gives a larger final volume of hydrogen, because it is a strong acid" },
        { correct: true, label: "Both acids give the same final volume, but hydrochloric acid gives it faster because its hydrogen ion concentration is higher" },
        { correct: false, label: "Ethanoic acid gives hydrogen faster, because its molecules ionise gradually as the reaction goes on" },
        { correct: false, label: "Ethanoic acid has a higher pH, because it contains fewer moles of acid" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Asid hidroklorik menghasilkan isi padu akhir hidrogen yang lebih besar, kerana ia asid kuat" },
        { correct: true, label: "Kedua-dua asid menghasilkan isi padu akhir yang sama, tetapi asid hidroklorik menghasilkannya lebih cepat kerana kepekatan ion hidrogennya lebih tinggi" },
        { correct: false, label: "Asid etanoik menghasilkan hidrogen lebih cepat, kerana molekulnya mengion secara beransur-ansur semasa tindak balas berlaku" },
        { correct: false, label: "Asid etanoik mempunyai pH lebih tinggi, kerana ia mengandungi bilangan mol asid yang lebih sedikit" },
      ],
    },
  },
};

export default item;
