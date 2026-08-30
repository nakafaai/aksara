import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Den Doppelpunkt nach dem Wort „nämlich“ entfernen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Den Doppelpunkt nach dem Wort „nämlich“ durch ein Semikolon ersetzen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Das Komma vor dem Wort „nämlich“ entfernen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Direkt nach den Wörtern „Die Behörde“ einen Doppelpunkt ergänzen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jedes Komma in der Aufzählung durch einen Punkt ersetzen.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { kind: "text", text: 'Remove the colon after the word "namely".' },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: 'Replace the colon after the word "namely" with a semicolon.',
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: 'Remove the comma before the word "namely".',
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: 'Add a colon immediately after the words "The agency".',
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Replace every comma in the enumeration with a full stop.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: 'Hapus tanda titik dua setelah kata "yaitu".',
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: 'Ganti tanda titik dua setelah kata "yaitu" dengan tanda titik koma.',
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: 'Hapus tanda koma sebelum kata "yaitu".' },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: 'Tambahkan tanda titik dua tepat setelah kata "lembaga".',
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Ganti setiap tanda koma dalam perincian dengan tanda titik.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
