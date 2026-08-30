import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Stunting bedeutet ein zu geringes Gewicht für die Körpergröße",
        },
        {
          isCorrect: false,
          label:
            "Stunting kann nur durch genetische Faktoren verursacht werden",
        },
        {
          isCorrect: false,
          label: "Stunting verursacht immer eine kognitive Behinderung",
        },
        {
          isCorrect: true,
          label:
            "Stunting ist eine zu geringe Körpergröße für das Alter und steht häufig mit chronischer oder wiederkehrender Unterernährung in Verbindung",
        },
        {
          isCorrect: false,
          label: "Überernährung ist die einzige Ursache von Stunting",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Stunting means low weight for height" },
        { isCorrect: false, label: "Only genetic factors can cause stunting" },
        {
          isCorrect: false,
          label: "Stunting always causes cognitive disability",
        },
        {
          isCorrect: true,
          label:
            "Stunting is low height for age and is commonly linked to chronic or recurrent undernutrition",
        },
        {
          isCorrect: false,
          label: "Overnutrition is the only cause of stunting",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Stunting berarti berat badan rendah menurut tinggi badan",
        },
        {
          isCorrect: false,
          label: "Stunting hanya dapat disebabkan oleh faktor genetik",
        },
        {
          isCorrect: false,
          label: "Stunting selalu menyebabkan disabilitas kognitif",
        },
        {
          isCorrect: true,
          label:
            "Stunting adalah tinggi badan rendah menurut usia dan umumnya berkaitan dengan kekurangan gizi kronis atau berulang",
        },
        {
          isCorrect: false,
          label: "Kelebihan gizi adalah satu-satunya penyebab stunting",
        },
      ],
    },
  },
};

export default item;
