import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Ausgangsdaten bewiesen, dass Pflanzortetiketten den Unterschied verursachten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team musste vor einer neuen Messung mehrere Verteilungsmerkmale zugleich ändern.",
        },
        {
          isCorrect: true,
          label:
            "Der mögliche Nutzen von Pflanzortetiketten musste deshalb an jedem Setzlingstablett geprüft werden.",
        },
        {
          isCorrect: false,
          label:
            "Das Ausgangsmuster rechtfertigte den dauerhaften Einsatz von Pflanzortetiketten.",
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
            "The baseline had proved that planting-site labels caused the difference.",
        },
        {
          isCorrect: false,
          label:
            "The team needed to change several distribution features at once before measuring again.",
        },
        {
          isCorrect: true,
          label:
            "The possible benefit of planting-site labels therefore needed to be tested on each seedling tray.",
        },
        {
          isCorrect: false,
          label:
            "The baseline pattern justified permanent use of planting-site labels.",
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
            "Data awal telah membuktikan bahwa label lokasi menyebabkan perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur pembagian bibit sekaligus sebelum mengukur ulang.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, dugaan tentang kegunaan label lokasi perlu diuji pada setiap baki bibit.",
        },
        {
          isCorrect: false,
          label:
            "Pola awal membenarkan penggunaan label lokasi secara permanen.",
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
