import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  responses: {
    de: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Eine Verschiebung erhält die Abstände zwischen Punkten.",
        },
        {
          isCorrect: true,
          label: "Eine Spiegelung erhält Winkelgrößen.",
        },
        {
          isCorrect: true,
          label:
            "Eine Streckung mit dem Faktor $2$ vervierfacht den Flächeninhalt.",
        },
        {
          isCorrect: false,
          label: "Eine Drehung verändert die Länge jeder Strecke.",
        },
      ],
    },
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "A translation preserves distances between points.",
        },
        {
          isCorrect: true,
          label: "A reflection preserves angle measures.",
        },
        {
          isCorrect: true,
          label: "A dilation with scale factor $2$ multiplies area by $4$.",
        },
        {
          isCorrect: false,
          label: "A rotation changes the length of every line segment.",
        },
      ],
    },
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Translasi mempertahankan jarak antartitik.",
        },
        {
          isCorrect: true,
          label: "Refleksi mempertahankan besar sudut.",
        },
        {
          isCorrect: true,
          label: "Dilatasi dengan faktor $2$ mengalikan luas dengan $4$.",
        },
        {
          isCorrect: false,
          label: "Rotasi mengubah panjang setiap ruas garis.",
        },
      ],
    },
  },
};

export default item;
