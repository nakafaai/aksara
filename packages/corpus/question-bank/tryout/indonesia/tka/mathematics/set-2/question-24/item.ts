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
          label: [
            {
              kind: "text",
              text: "Eine Verschiebung erhält die Abstände zwischen Punkten.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Eine Spiegelung erhält Winkelgrößen." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Eine Streckung mit dem Faktor " },
            { display: "inline", kind: "math", math: "2" },
            { kind: "text", text: " vervierfacht den Flächeninhalt." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Eine Drehung verändert die Länge jeder Strecke.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "A translation preserves distances between points.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "A reflection preserves angle measures." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "A dilation with scale factor " },
            { display: "inline", kind: "math", math: "2" },
            { kind: "text", text: " multiplies area by " },
            { display: "inline", kind: "math", math: "4" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "A rotation changes the length of every line segment.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Translasi mempertahankan jarak antartitik.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Refleksi mempertahankan besar sudut." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Dilatasi dengan faktor " },
            { display: "inline", kind: "math", math: "2" },
            { kind: "text", text: " mengalikan luas dengan " },
            { display: "inline", kind: "math", math: "4" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Rotasi mengubah panjang setiap ruas garis.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
