import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Alle nicht anonymen Berichte sind verifiziert.",
        },
        {
          isCorrect: false,
          label: "Einige anonymen Berichte sind verifiziert.",
        },
        {
          isCorrect: false,
          label: "Kein Bezirksbericht ist anonym.",
        },
        {
          isCorrect: false,
          label: "Jeder archivierte Bericht ist verifiziert.",
        },
        {
          isCorrect: true,
          label:
            "Einige Bezirksberichte werden archiviert und sind nicht anonym.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Every non-anonymous report is verified.",
        },
        {
          isCorrect: false,
          label: "Some anonymous reports are verified.",
        },
        {
          isCorrect: false,
          label: "No district report is anonymous.",
        },
        {
          isCorrect: false,
          label: "Every archived report is verified.",
        },
        {
          isCorrect: true,
          label: "Some district reports are archived and are not anonymous.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Semua laporan yang tidak anonim telah diverifikasi.",
        },
        {
          isCorrect: false,
          label: "Sebagian laporan anonim telah diverifikasi.",
        },
        {
          isCorrect: false,
          label: "Tidak ada laporan distrik yang anonim.",
        },
        {
          isCorrect: false,
          label: "Setiap laporan yang diarsipkan telah diverifikasi.",
        },
        {
          isCorrect: true,
          label:
            "Sebagian laporan distrik diarsipkan dan bukan laporan anonim.",
        },
      ],
    },
  },
};

export default item;
