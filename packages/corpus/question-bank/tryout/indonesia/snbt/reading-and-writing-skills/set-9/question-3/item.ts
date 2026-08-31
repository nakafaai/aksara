import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Beobachtung bewies daher, dass die Änderung Pflanzortetiketten auf jedem Tablett den Unterschied verursachte.",
        },
        {
          isCorrect: false,
          label:
            "Das Team musste daher mehrere Merkmale im Kontext Verteilung von Mangrovensetzlingen ändern, bevor es erneut maß.",
        },
        {
          isCorrect: true,
          label:
            "Die Hypothese musste deshalb mit folgender Änderung in einem begrenzten Versuch geprüft werden: Pflanzortetiketten auf jedem Tablett.",
        },
        {
          isCorrect: false,
          label:
            "Das erste Muster rechtfertigte daher die dauerhafte Einführung von Pflanzortetiketten auf jedem Tablett.",
        },
        {
          isCorrect: false,
          label:
            "Die verbleibende Unsicherheit machte einen weiteren Vergleich daher überflüssig.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The observation therefore established that planting-site labels on every tray caused the difference.",
        },
        {
          isCorrect: false,
          label:
            "The team therefore needed to alter several features of mangrove seedling distribution before measuring again.",
        },
        {
          isCorrect: true,
          label:
            "The hypothesis therefore needed a limited test of planting-site labels on every tray.",
        },
        {
          isCorrect: false,
          label:
            "The initial pattern therefore justified permanent adoption of planting-site labels on every tray.",
        },
        {
          isCorrect: false,
          label:
            "The remaining uncertainty therefore made another comparison unnecessary.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengamatan itu membuktikan bahwa label lokasi tanam pada setiap baki menyebabkan perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur distribusi bibit mangrove sebelum melakukan pengukuran ulang.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji secara terbatas melalui label lokasi tanam.",
        },
        {
          isCorrect: false,
          label:
            "Pola awal itu membenarkan penerapan tetap label lokasi tanam pada setiap baki.",
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
