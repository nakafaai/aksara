import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Ausgangsdaten bewiesen, dass Beispielfotos den Unterschied in der Übereinstimmung verursachten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team musste vor der nächsten Messung mehrere Merkmale der Erfassung gleichzeitig ändern.",
        },
        {
          isCorrect: false,
          label:
            "Das Ausgangsmuster rechtfertigte die dauerhafte Einführung von Beispielfotos.",
        },
        {
          isCorrect: true,
          label:
            "Die Hypothese musste deshalb durch zusätzliche Beispielfotos für jede Zustandskategorie geprüft werden.",
        },
        {
          isCorrect: false,
          label:
            "Die verbleibende Unsicherheit machte einen weiteren Vergleich überflüssig.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The baseline proved that sample photographs caused the difference in agreement.",
        },
        {
          isCorrect: false,
          label:
            "The team needed to change several survey features at once before measuring again.",
        },
        {
          isCorrect: false,
          label:
            "The baseline pattern justified adopting sample photographs permanently.",
        },
        {
          isCorrect: true,
          label:
            "The hypothesis therefore needed to be tested by adding sample photographs for each condition category.",
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
            "Data awal membuktikan bahwa contoh foto menyebabkan perbedaan kesepakatan.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur pendataan sekaligus sebelum mengukur ulang.",
        },
        {
          isCorrect: false,
          label: "Pola awal membenarkan penerapan permanen contoh foto.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji dengan menambahkan contoh foto untuk setiap kategori kondisi.",
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
