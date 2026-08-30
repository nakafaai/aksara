import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Überschwemmungen können Trinkwasserquellen verunreinigen",
        },
        {
          isCorrect: false,
          label: "Stehendes Wasser kann Mücken als Brutstätte dienen",
        },
        {
          isCorrect: false,
          label:
            "Eine Überschwemmung allein beweist nicht, dass ein Ausbruch stattfinden wird",
        },
        {
          isCorrect: true,
          label:
            "Mehr stehendes Wasser verringert die Brutmöglichkeiten für Mücken immer",
        },
        {
          isCorrect: false,
          label:
            "Örtliche Bedingungen und Bekämpfungsmaßnahmen können das Ausbruchsrisiko beeinflussen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Floods can contaminate drinking-water supplies",
        },
        {
          isCorrect: false,
          label: "Standing water can provide breeding sites for mosquitoes",
        },
        {
          isCorrect: false,
          label: "A flood by itself does not prove that an outbreak will occur",
        },
        {
          isCorrect: true,
          label:
            "More standing water always lowers the potential for mosquito breeding",
        },
        {
          isCorrect: false,
          label:
            "Local conditions and control measures can affect outbreak risk",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Banjir dapat mencemari sumber air minum",
        },
        {
          isCorrect: false,
          label: "Genangan air dapat menjadi tempat berkembang biak nyamuk",
        },
        {
          isCorrect: false,
          label: "Banjir saja tidak membuktikan bahwa wabah pasti terjadi",
        },
        {
          isCorrect: true,
          label:
            "Semakin banyak genangan, potensi perkembangbiakan nyamuk selalu semakin rendah",
        },
        {
          isCorrect: false,
          label:
            "Kondisi setempat dan tindakan pengendalian dapat memengaruhi risiko wabah",
        },
      ],
    },
  },
};

export default item;
