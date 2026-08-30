import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "schnelle Veränderungen." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "sorgfältige Behandlung." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "laut singen." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Vogelrufe." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "sanftes Waschen." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "rapid changes." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "careful treatment." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "singing loudly." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "bird calls." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "gentle washing." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "perubahan cepat." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "perawatan cermat." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "bernyanyi nyaring." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "kicauan burung." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "pencucian lembut." }],
        },
      ],
    },
  },
};

export default item;
