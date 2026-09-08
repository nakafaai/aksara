import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Ausgangsdaten bewiesen, dass Fragekarten den Unterschied verursachten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team musste vor einer neuen Messung mehrere Merkmale der Führung zugleich ändern.",
        },
        {
          isCorrect: true,
          label:
            "Der mögliche Nutzen von Fragekarten musste deshalb an jedem Vorführungstisch geprüft werden.",
        },
        {
          isCorrect: false,
          label:
            "Das Ausgangsmuster rechtfertigte den dauerhaften Einsatz von Fragekarten.",
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
            "The baseline had proved that question cards caused the difference.",
        },
        {
          isCorrect: false,
          label:
            "The team needed to change several tour features at once before measuring again.",
        },
        {
          isCorrect: true,
          label:
            "The possible benefit of question cards therefore needed to be tested at each demonstration table.",
        },
        {
          isCorrect: false,
          label:
            "The baseline pattern justified permanent use of question cards.",
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
            "Data awal telah membuktikan bahwa kartu pertanyaan menyebabkan perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur tur sekaligus sebelum mengukur ulang.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, dugaan tentang kegunaan kartu pertanyaan perlu diuji pada setiap meja demonstrasi.",
        },
        {
          isCorrect: false,
          label:
            "Pola awal membenarkan penggunaan kartu pertanyaan secara permanen.",
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
