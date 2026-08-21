import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Den Doppelpunkt nach dem Wort „nämlich“ entfernen.",
      value: true,
    },
    {
      label:
        "Den Doppelpunkt nach dem Wort „nämlich“ durch ein Semikolon ersetzen.",
      value: false,
    },
    {
      label: "Das Komma vor dem Wort „nämlich“ entfernen.",
      value: false,
    },
    {
      label:
        "Direkt nach den Wörtern „Die Behörde“ einen Doppelpunkt ergänzen.",
      value: false,
    },
    {
      label: "Jedes Komma in der Aufzählung durch einen Punkt ersetzen.",
      value: false,
    },
  ],
  en: [
    {
      label: 'Remove the colon after the word "namely".',
      value: true,
    },
    {
      label: 'Replace the colon after the word "namely" with a semicolon.',
      value: false,
    },
    {
      label: 'Remove the comma before the word "namely".',
      value: false,
    },
    {
      label: 'Add a colon immediately after the words "The agency".',
      value: false,
    },
    {
      label: "Replace every comma in the enumeration with a full stop.",
      value: false,
    },
  ],
  id: [
    {
      label: 'Hapus tanda titik dua setelah kata "yaitu".',
      value: true,
    },
    {
      label:
        'Ganti tanda titik dua setelah kata "yaitu" dengan tanda titik koma.',
      value: false,
    },
    {
      label: 'Hapus tanda koma sebelum kata "yaitu".',
      value: false,
    },
    {
      label: 'Tambahkan tanda titik dua tepat setelah kata "lembaga".',
      value: false,
    },
    {
      label: "Ganti setiap tanda koma dalam perincian dengan tanda titik.",
      value: false,
    },
  ],
};

export default choices;
