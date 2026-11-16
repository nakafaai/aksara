import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Bronze is softer, because its dents are smaller, and it holds about 9 copper atoms for every tin atom" },
        { correct: true, label: "Bronze is harder, and it holds about 17 copper atoms for every tin atom, so scattered tin atoms disturb the layers of copper atoms and stop them sliding easily" },
        { correct: false, label: "Bronze is harder, and it holds about 9 copper atoms for every tin atom, so the tin atoms form covalent bonds with copper" },
        { correct: false, label: "Pure copper is harder, because its atoms are all the same size and pack more tightly" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Gangsa lebih lembut, kerana lekuknya lebih kecil, dan ia mengandungi kira-kira 9 atom kuprum bagi setiap atom stanum" },
        { correct: true, label: "Gangsa lebih keras, dan ia mengandungi kira-kira 17 atom kuprum bagi setiap atom stanum, jadi atom stanum yang bertaburan mengganggu lapisan atom kuprum supaya tidak mudah menggelongsor" },
        { correct: false, label: "Gangsa lebih keras, dan ia mengandungi kira-kira 9 atom kuprum bagi setiap atom stanum, jadi atom stanum membentuk ikatan kovalen dengan kuprum" },
        { correct: false, label: "Kuprum tulen lebih keras, kerana atomnya sama saiz dan tersusun lebih padat" },
      ],
    },
  },
};

export default item;
