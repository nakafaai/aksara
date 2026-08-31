import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Beobachtung bewies daher, dass die Änderung Menüvorbestellung am Vortag den Unterschied verursachte.",
        },
        {
          isCorrect: true,
          label:
            "Die Hypothese musste deshalb mit folgender Änderung in einem begrenzten Versuch geprüft werden: Menübestellung am Vortag.",
        },
        {
          isCorrect: false,
          label:
            "Das Team musste daher mehrere Merkmale im Kontext Schulfrühstücksprogramm ändern, bevor es erneut maß.",
        },
        {
          isCorrect: false,
          label:
            "Das erste Muster rechtfertigte daher die dauerhafte Einführung von Menüvorbestellung am Vortag.",
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
            "The observation therefore established that menu booking one day in advance caused the difference.",
        },
        {
          isCorrect: true,
          label:
            "The hypothesis therefore needed a limited test of menu booking one day in advance.",
        },
        {
          isCorrect: false,
          label:
            "The team therefore needed to alter several features of school breakfast programme before measuring again.",
        },
        {
          isCorrect: false,
          label:
            "The initial pattern therefore justified permanent adoption of menu booking one day in advance.",
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
            "Pengamatan itu membuktikan bahwa pemesanan menu sehari sebelumnya menyebabkan perbedaan.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji secara terbatas melalui pemesanan menu sehari sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur program sarapan sekolah sebelum melakukan pengukuran ulang.",
        },
        {
          isCorrect: false,
          label:
            "Pola awal itu membenarkan penerapan tetap pemesanan menu sehari sebelumnya.",
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
