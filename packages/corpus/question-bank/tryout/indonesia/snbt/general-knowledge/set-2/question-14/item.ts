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
          isCorrect: true,
          label: "Vogelrufe.",
        },
        {
          isCorrect: false,
          label: "sorgfältige Behandlung.",
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
          isCorrect: true,
          label: "bird calls.",
        },
        {
          isCorrect: false,
          label: "careful treatment.",
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
          isCorrect: true,
          label: "kicauan burung.",
        },
        {
          isCorrect: false,
          label: "perawatan cermat.",
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
