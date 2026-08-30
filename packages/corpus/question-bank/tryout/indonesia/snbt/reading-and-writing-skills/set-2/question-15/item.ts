import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Zählung beweist, dass die meisten indonesischen Landwirte jung sind.",
        },
        {
          isCorrect: false,
          label:
            "Der Rückgang landwirtschaftlicher Einzelbetriebe beweist, dass Indonesiens Agrarsektor schrumpft.",
        },
        {
          isCorrect: false,
          label:
            "Die städtische Landwirtschaft ist heute die größte Form der Landwirtschaft in Indonesien.",
        },
        {
          isCorrect: false,
          label:
            "Die Einhaltung internationaler Zählungsstandards verbessert allein das Wohlergehen der Landwirte.",
        },
        {
          isCorrect: true,
          label:
            "Daher bietet die Landwirtschaftszählung 2023 eine breite, standardisierte Datengrundlage für die Gestaltung der indonesischen Agrarpolitik.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The census proves that most Indonesian farmers are young.",
        },
        {
          isCorrect: false,
          label:
            "The decline in individual agricultural holdings proves that Indonesia's agricultural sector is shrinking.",
        },
        {
          isCorrect: false,
          label:
            "Urban farming is now the largest form of agriculture in Indonesia.",
        },
        {
          isCorrect: false,
          label:
            "Following international census standards will by itself improve farmer welfare.",
        },
        {
          isCorrect: true,
          label:
            "Therefore, the 2023 Agricultural Census provides a broad, standardized evidence base for designing Indonesia's agricultural policies.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sensus tersebut membuktikan bahwa sebagian besar petani Indonesia masih muda.",
        },
        {
          isCorrect: false,
          label:
            "Penurunan usaha pertanian perorangan membuktikan bahwa sektor pertanian Indonesia sedang menyusut.",
        },
        {
          isCorrect: false,
          label:
            "Pertanian perkotaan kini menjadi bentuk pertanian terbesar di Indonesia.",
        },
        {
          isCorrect: false,
          label:
            "Penerapan standar sensus internasional dengan sendirinya akan meningkatkan kesejahteraan petani.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, Sensus Pertanian 2023 menyediakan landasan bukti yang luas dan terstandar untuk merancang kebijakan pertanian Indonesia.",
        },
      ],
    },
  },
};

export default item;
