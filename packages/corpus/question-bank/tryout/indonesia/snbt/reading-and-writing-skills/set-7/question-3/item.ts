import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Ausgangsdaten bewiesen, dass Bestellungen am Vortag den Unterschied verursachten.",
        },
        {
          isCorrect: true,
          label:
            "Die Hypothese musste deshalb mit Menübestellungen am Vortag geprüft werden.",
        },
        {
          isCorrect: false,
          label:
            "Das Team musste vor der nächsten Messung mehrere Programmmerkmale gleichzeitig ändern.",
        },
        {
          isCorrect: false,
          label:
            "Das Ausgangsmuster rechtfertigte die dauerhafte Einführung von Vorbestellungen.",
        },
        {
          isCorrect: false,
          label:
            "Die verbleibende Unsicherheit machte weitere Vergleiche überflüssig.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The baseline proved that ordering one day in advance caused the difference.",
        },
        {
          isCorrect: true,
          label:
            "The hypothesis therefore needed to be tested through menu orders placed one day in advance.",
        },
        {
          isCorrect: false,
          label:
            "The team needed to change several programme features at once before measuring again.",
        },
        {
          isCorrect: false,
          label:
            "The baseline pattern justified adopting advance orders permanently.",
        },
        {
          isCorrect: false,
          label:
            "The remaining uncertainty made further comparison unnecessary.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data awal membuktikan bahwa pemesanan sehari sebelumnya menyebabkan perbedaan hasil.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji melalui pemesanan menu sehari sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur program sarapan sekaligus sebelum mengukur ulang.",
        },
        {
          isCorrect: false,
          label:
            "Pola awal membenarkan pemesanan sehari sebelumnya secara permanen.",
        },
        {
          isCorrect: false,
          label:
            "Ketidakpastian yang tersisa membuat perbandingan lanjutan tidak diperlukan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
