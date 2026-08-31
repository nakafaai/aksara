import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  responses: {
    de: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Der Scheitel ist $(2,-1)$.",
        },
        {
          isCorrect: true,
          label: "Der Wertebereich ist $[-1,\\infty)$.",
        },
        {
          isCorrect: true,
          label: "Die Funktion ist auf $(-\\infty,2]$ fallend.",
        },
        {
          isCorrect: false,
          label: "Die Funktion ist auf $\\mathbb R$ injektiv.",
        },
        {
          isCorrect: true,
          label: "Auf $[2,\\infty)$ gilt $f^{-1}(y)=2+\\sqrt{y+1}$.",
        },
      ],
    },
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "The vertex is $(2,-1)$.",
        },
        {
          isCorrect: true,
          label: "The range is $[-1,\\infty)$.",
        },
        {
          isCorrect: true,
          label: "The function decreases on $(-\\infty,2]$.",
        },
        {
          isCorrect: false,
          label: "The function is one-to-one on $\\mathbb R$.",
        },
        {
          isCorrect: true,
          label: "On $[2,\\infty)$, $f^{-1}(y)=2+\\sqrt{y+1}$.",
        },
      ],
    },
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Titik puncaknya adalah $(2,-1)$.",
        },
        {
          isCorrect: true,
          label: "Range fungsi adalah $[-1,\\infty)$.",
        },
        {
          isCorrect: true,
          label: "Fungsi menurun pada $(-\\infty,2]$.",
        },
        {
          isCorrect: false,
          label: "Fungsi satu-satu pada $\\mathbb R$.",
        },
        {
          isCorrect: true,
          label: "Pada $[2,\\infty)$, $f^{-1}(y)=2+\\sqrt{y+1}$.",
        },
      ],
    },
  },
};

export default item;
