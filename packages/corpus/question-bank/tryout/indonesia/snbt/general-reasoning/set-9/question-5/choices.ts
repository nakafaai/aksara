import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Überschwemmungen können Trinkwasserquellen verunreinigen",
      value: false,
    },
    {
      label: "Stehendes Wasser kann Mücken als Brutstätte dienen",
      value: false,
    },
    {
      label:
        "Eine Überschwemmung allein beweist nicht, dass ein Ausbruch stattfinden wird",
      value: false,
    },
    {
      label:
        "Mehr stehendes Wasser verringert die Brutmöglichkeiten für Mücken immer",
      value: true,
    },
    {
      label:
        "Örtliche Bedingungen und Bekämpfungsmaßnahmen können das Ausbruchsrisiko beeinflussen",
      value: false,
    },
  ],
  en: [
    {
      label: "Floods can contaminate drinking-water supplies",
      value: false,
    },
    {
      label: "Standing water can provide breeding sites for mosquitoes",
      value: false,
    },
    {
      label: "A flood by itself does not prove that an outbreak will occur",
      value: false,
    },
    {
      label:
        "More standing water always lowers the potential for mosquito breeding",
      value: true,
    },
    {
      label: "Local conditions and control measures can affect outbreak risk",
      value: false,
    },
  ],
  id: [
    {
      label: "Banjir dapat mencemari sumber air minum",
      value: false,
    },
    {
      label: "Genangan air dapat menjadi tempat berkembang biak nyamuk",
      value: false,
    },
    {
      label: "Banjir saja tidak membuktikan bahwa wabah pasti terjadi",
      value: false,
    },
    {
      label:
        "Semakin banyak genangan, potensi perkembangbiakan nyamuk selalu semakin rendah",
      value: true,
    },
    {
      label:
        "Kondisi setempat dan tindakan pengendalian dapat memengaruhi risiko wabah",
      value: false,
    },
  ],
};

export default choices;
