import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Bronze is softer, because its dents are smaller" },
        { correct: true, label: "Bronze is harder, because tin atoms of a different size disturb the layers of copper atoms so they cannot slide easily" },
        { correct: false, label: "Bronze is harder, because tin atoms form covalent bonds with copper atoms" },
        { correct: false, label: "Pure copper is harder, because its atoms are all the same size and pack more tightly" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Gangsa lebih lembut, kerana lekuknya lebih kecil" },
        { correct: true, label: "Gangsa lebih keras, kerana atom stanum yang berbeza saiz mengganggu lapisan atom kuprum supaya tidak mudah menggelongsor" },
        { correct: false, label: "Gangsa lebih keras, kerana atom stanum membentuk ikatan kovalen dengan atom kuprum" },
        { correct: false, label: "Kuprum tulen lebih keras, kerana atomnya sama saiz dan tersusun lebih padat" },
      ],
    },
  },
};

export default item;
