import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Stunting bedeutet ein zu geringes Gewicht für die Körpergröße",
      value: false,
    },
    {
      label: "Stunting kann nur durch genetische Faktoren verursacht werden",
      value: false,
    },
    {
      label: "Stunting verursacht immer eine kognitive Behinderung",
      value: false,
    },
    {
      label:
        "Stunting ist eine zu geringe Körpergröße für das Alter und steht häufig mit chronischer oder wiederkehrender Unterernährung in Verbindung",
      value: true,
    },
    {
      label: "Überernährung ist die einzige Ursache von Stunting",
      value: false,
    },
  ],
  en: [
    { label: "Stunting means low weight for height", value: false },
    { label: "Only genetic factors can cause stunting", value: false },
    { label: "Stunting always causes cognitive disability", value: false },
    {
      label:
        "Stunting is low height for age and is commonly linked to chronic or recurrent undernutrition",
      value: true,
    },
    { label: "Overnutrition is the only cause of stunting", value: false },
  ],
  id: [
    {
      label: "Stunting berarti berat badan rendah menurut tinggi badan",
      value: false,
    },
    {
      label: "Stunting hanya dapat disebabkan oleh faktor genetik",
      value: false,
    },
    {
      label: "Stunting selalu menyebabkan disabilitas kognitif",
      value: false,
    },
    {
      label:
        "Stunting adalah tinggi badan rendah menurut usia dan umumnya berkaitan dengan kekurangan gizi kronis atau berulang",
      value: true,
    },
    {
      label: "Kelebihan gizi adalah satu-satunya penyebab stunting",
      value: false,
    },
  ],
};

export default choices;
