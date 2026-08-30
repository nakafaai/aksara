import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "schnelle Veränderungen.",
        },
        {
          isCorrect: false,
          label: "sorgfältige Behandlung.",
        },
        {
          isCorrect: true,
          label: "Vogelrufe.",
        },
        {
          isCorrect: false,
          label: "laut singen.",
        },
        {
          isCorrect: false,
          label: "sanftes Waschen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "rapid changes.",
        },
        {
          isCorrect: false,
          label: "careful treatment.",
        },
        {
          isCorrect: true,
          label: "bird calls.",
        },
        {
          isCorrect: false,
          label: "singing loudly.",
        },
        {
          isCorrect: false,
          label: "gentle washing.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "perubahan cepat.",
        },
        {
          isCorrect: false,
          label: "perawatan cermat.",
        },
        {
          isCorrect: true,
          label: "kicauan burung.",
        },
        {
          isCorrect: false,
          label: "bernyanyi nyaring.",
        },
        {
          isCorrect: false,
          label: "pencucian lembut.",
        },
      ],
    },
  },
};

export default item;
