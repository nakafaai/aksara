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
              text: "Die Zählung beweist, dass die meisten indonesischen Landwirte jung sind.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Daher bietet die Landwirtschaftszählung 2023 eine breite, standardisierte Datengrundlage für die Gestaltung der indonesischen Agrarpolitik.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Rückgang landwirtschaftlicher Einzelbetriebe beweist, dass Indonesiens Agrarsektor schrumpft.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die städtische Landwirtschaft ist heute die größte Form der Landwirtschaft in Indonesien.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Einhaltung internationaler Zählungsstandards verbessert allein das Wohlergehen der Landwirte.",
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
              text: "The census proves that most Indonesian farmers are young.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Therefore, the 2023 Agricultural Census provides a broad, standardized evidence base for designing Indonesia's agricultural policies.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The decline in individual agricultural holdings proves that Indonesia's agricultural sector is shrinking.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Urban farming is now the largest form of agriculture in Indonesia.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Following international census standards will by itself improve farmer welfare.",
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
            {
              kind: "text",
              text: "Sensus tersebut membuktikan bahwa sebagian besar petani Indonesia masih muda.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Oleh karena itu, Sensus Pertanian 2023 menyediakan landasan bukti yang luas dan terstandar untuk merancang kebijakan pertanian Indonesia.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Penurunan usaha pertanian perorangan membuktikan bahwa sektor pertanian Indonesia sedang menyusut.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pertanian perkotaan kini menjadi bentuk pertanian terbesar di Indonesia.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Penerapan standar sensus internasional dengan sendirinya akan meningkatkan kesejahteraan petani.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
