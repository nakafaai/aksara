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
          label: "Eine Verschiebung erhält die Parallelität von Geraden.",
        },
        {
          isCorrect: true,
          label: "Eine Drehung erhält Abstände zwischen Punkten.",
        },
        {
          isCorrect: true,
          label: "Eine Streckung mit dem Faktor $3$ verdreifacht den Umfang.",
        },
        {
          isCorrect: false,
          label: "Eine Spiegelung erhält immer die Orientierung einer Figur.",
        },
      ],
    },
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "A translation preserves parallel lines.",
        },
        {
          isCorrect: true,
          label: "A rotation preserves distances between points.",
        },
        {
          isCorrect: true,
          label: "A dilation with scale factor $3$ triples the perimeter.",
        },
        {
          isCorrect: false,
          label: "A reflection always preserves a figure's orientation.",
        },
      ],
    },
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Translasi mempertahankan kesejajaran garis.",
        },
        {
          isCorrect: true,
          label: "Rotasi mempertahankan jarak antartitik.",
        },
        {
          isCorrect: true,
          label: "Dilatasi dengan faktor $3$ mengalikan keliling dengan $3$.",
        },
        {
          isCorrect: false,
          label: "Refleksi selalu mempertahankan orientasi suatu bangun.",
        },
      ],
    },
  },
};

export default item;
