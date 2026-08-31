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
          label: "$T(1,-2)=(4,2)$.",
        },
        {
          isCorrect: true,
          label: "T verdoppelt jede Länge.",
        },
        {
          isCorrect: true,
          label: "T vervierfacht jeden Flächeninhalt.",
        },
        {
          isCorrect: false,
          label: "T kehrt die Orientierung um.",
        },
        {
          isCorrect: true,
          label: "$T^2(x,y)=(-4x,-4y)$.",
        },
      ],
    },
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "$T(1,-2)=(4,2)$.",
        },
        {
          isCorrect: true,
          label: "T doubles every length.",
        },
        {
          isCorrect: true,
          label: "T multiplies every area by $4$.",
        },
        {
          isCorrect: false,
          label: "T reverses orientation.",
        },
        {
          isCorrect: true,
          label: "$T^2(x,y)=(-4x,-4y)$.",
        },
      ],
    },
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "$T(1,-2)=(4,2)$.",
        },
        {
          isCorrect: true,
          label: "T menggandakan setiap panjang.",
        },
        {
          isCorrect: true,
          label: "T mengalikan setiap luas dengan $4$.",
        },
        {
          isCorrect: false,
          label: "T membalik orientasi.",
        },
        {
          isCorrect: true,
          label: "$T^2(x,y)=(-4x,-4y)$.",
        },
      ],
    },
  },
};

export default item;
