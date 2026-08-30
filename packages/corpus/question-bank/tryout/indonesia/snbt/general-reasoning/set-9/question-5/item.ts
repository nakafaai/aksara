import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Überschwemmungen können Trinkwasserquellen verunreinigen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Stehendes Wasser kann Mücken als Brutstätte dienen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Eine Überschwemmung allein beweist nicht, dass ein Ausbruch stattfinden wird",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Mehr stehendes Wasser verringert die Brutmöglichkeiten für Mücken immer",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Örtliche Bedingungen und Bekämpfungsmaßnahmen können das Ausbruchsrisiko beeinflussen",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Floods can contaminate drinking-water supplies",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Standing water can provide breeding sites for mosquitoes",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "A flood by itself does not prove that an outbreak will occur",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "More standing water always lowers the potential for mosquito breeding",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Local conditions and control measures can affect outbreak risk",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Banjir dapat mencemari sumber air minum" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Genangan air dapat menjadi tempat berkembang biak nyamuk",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Banjir saja tidak membuktikan bahwa wabah pasti terjadi",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Semakin banyak genangan, potensi perkembangbiakan nyamuk selalu semakin rendah",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kondisi setempat dan tindakan pengendalian dapat memengaruhi risiko wabah",
            },
          ],
        },
      ],
    },
  },
};

export default item;
