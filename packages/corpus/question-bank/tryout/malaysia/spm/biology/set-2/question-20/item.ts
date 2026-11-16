import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "cell-biology-and-organisation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Golgi apparatus, rough endoplasmic reticulum, secretory vesicle" },
        { correct: false, label: "Rough endoplasmic reticulum, smooth endoplasmic reticulum, secretory vesicle" },
        { correct: false, label: "Rough endoplasmic reticulum, secretory vesicle, Golgi apparatus" },
        { correct: true, label: "Rough endoplasmic reticulum, Golgi apparatus, secretory vesicle" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Jasad Golgi, jalinan endoplasma kasar, vesikel rembesan" },
        { correct: false, label: "Jalinan endoplasma kasar, jalinan endoplasma licin, vesikel rembesan" },
        { correct: false, label: "Jalinan endoplasma kasar, vesikel rembesan, jasad Golgi" },
        { correct: true, label: "Jalinan endoplasma kasar, jasad Golgi, vesikel rembesan" },
      ],
    },
  },
};

export default item;
