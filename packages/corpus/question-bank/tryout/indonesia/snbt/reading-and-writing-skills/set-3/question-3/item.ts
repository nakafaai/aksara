import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Beobachtung bewies daher, dass die Änderung kontrastreichere Sammelplatzsymbole den Unterschied verursachte.",
        },
        {
          isCorrect: false,
          label:
            "Das Team musste daher mehrere Merkmale im Kontext Evakuierungsplan ändern, bevor es erneut maß.",
        },
        {
          isCorrect: false,
          label:
            "Das erste Muster rechtfertigte daher die dauerhafte Einführung von kontrastreichere Sammelplatzsymbole.",
        },
        {
          isCorrect: true,
          label:
            "Die Hypothese musste deshalb mit folgender Änderung in einem begrenzten Versuch geprüft werden: kontrastreichere Symbole für Sammelpunkte.",
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
            "The observation therefore established that higher-contrast assembly-point symbols caused the difference.",
        },
        {
          isCorrect: false,
          label:
            "The team therefore needed to alter several features of evacuation route map before measuring again.",
        },
        {
          isCorrect: false,
          label:
            "The initial pattern therefore justified permanent adoption of higher-contrast assembly-point symbols.",
        },
        {
          isCorrect: true,
          label:
            "The hypothesis therefore needed a limited test of higher-contrast assembly-point symbols.",
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
            "Pengamatan itu membuktikan bahwa simbol titik kumpul dengan kontras lebih tinggi menyebabkan perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur peta jalur evakuasi sebelum melakukan pengukuran ulang.",
        },
        {
          isCorrect: false,
          label:
            "Pola awal itu membenarkan penerapan tetap simbol titik kumpul dengan kontras lebih tinggi.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji secara terbatas melalui simbol titik kumpul yang lebih kontras.",
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
