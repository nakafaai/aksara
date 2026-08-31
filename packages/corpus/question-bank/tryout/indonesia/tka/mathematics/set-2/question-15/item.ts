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
          label: "$T(x,y)=(y,x)$",
        },
        {
          isCorrect: true,
          label: "$T(2,-3)=(-3,2)$",
        },
        {
          isCorrect: true,
          label: "$T^2$ ist die Identität.",
        },
        {
          isCorrect: true,
          label: "Alle Fixpunkte von T liegen auf $y=x$.",
        },
        {
          isCorrect: false,
          label: "T erhält die Orientierung.",
        },
      ],
    },
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "$T(x,y)=(y,x)$",
        },
        {
          isCorrect: true,
          label: "$T(2,-3)=(-3,2)$",
        },
        {
          isCorrect: true,
          label: "$T^2$ is the identity.",
        },
        {
          isCorrect: true,
          label: "Every fixed point of T lies on $y=x$.",
        },
        {
          isCorrect: false,
          label: "T preserves orientation.",
        },
      ],
    },
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "$T(x,y)=(y,x)$",
        },
        {
          isCorrect: true,
          label: "$T(2,-3)=(-3,2)$",
        },
        {
          isCorrect: true,
          label: "$T^2$ adalah identitas.",
        },
        {
          isCorrect: true,
          label: "Semua titik tetap T terletak pada $y=x$.",
        },
        {
          isCorrect: false,
          label: "T mempertahankan orientasi.",
        },
      ],
    },
  },
};

export default item;
