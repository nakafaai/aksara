import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Den Doppelpunkt nach dem Wort „nämlich“ entfernen.",
        },
        {
          isCorrect: false,
          label:
            "Den Doppelpunkt nach dem Wort „nämlich“ durch ein Semikolon ersetzen.",
        },
        {
          isCorrect: false,
          label: "Das Komma vor dem Wort „nämlich“ entfernen.",
        },
        {
          isCorrect: false,
          label:
            "Direkt nach den Wörtern „Die Behörde“ einen Doppelpunkt ergänzen.",
        },
        {
          isCorrect: false,
          label: "Jedes Komma in der Aufzählung durch einen Punkt ersetzen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: 'Remove the colon after the word "namely".',
        },
        {
          isCorrect: false,
          label: 'Replace the colon after the word "namely" with a semicolon.',
        },
        {
          isCorrect: false,
          label: 'Remove the comma before the word "namely".',
        },
        {
          isCorrect: false,
          label: 'Add a colon immediately after the words "The agency".',
        },
        {
          isCorrect: false,
          label: "Replace every comma in the enumeration with a full stop.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: 'Hapus tanda titik dua setelah kata "yaitu".',
        },
        {
          isCorrect: false,
          label:
            'Ganti tanda titik dua setelah kata "yaitu" dengan tanda titik koma.',
        },
        {
          isCorrect: false,
          label: 'Hapus tanda koma sebelum kata "yaitu".',
        },
        {
          isCorrect: false,
          label: 'Tambahkan tanda titik dua tepat setelah kata "lembaga".',
        },
        {
          isCorrect: false,
          label: "Ganti setiap tanda koma dalam perincian dengan tanda titik.",
        },
      ],
    },
  },
};

export default item;
