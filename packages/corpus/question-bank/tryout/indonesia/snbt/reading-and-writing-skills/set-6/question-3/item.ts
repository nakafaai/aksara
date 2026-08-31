import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die Hypothese musste deshalb mit folgender Änderung in einem begrenzten Versuch geprüft werden: Richtungspfeile an jeder Abzweigung.",
        },
        {
          isCorrect: false,
          label:
            "Die Beobachtung bewies daher, dass die Änderung Richtungspfeile an jeder Kreuzung den Unterschied verursachte.",
        },
        {
          isCorrect: false,
          label:
            "Das Team musste daher mehrere Merkmale im Kontext Ausstellung von Schülerarbeiten ändern, bevor es erneut maß.",
        },
        {
          isCorrect: false,
          label:
            "Das erste Muster rechtfertigte daher die dauerhafte Einführung von Richtungspfeile an jeder Kreuzung.",
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
          isCorrect: true,
          label:
            "The hypothesis therefore needed a limited test of direction arrows placed at each junction.",
        },
        {
          isCorrect: false,
          label:
            "The observation therefore established that direction arrows placed at each junction caused the difference.",
        },
        {
          isCorrect: false,
          label:
            "The team therefore needed to alter several features of student work exhibition before measuring again.",
        },
        {
          isCorrect: false,
          label:
            "The initial pattern therefore justified permanent adoption of direction arrows placed at each junction.",
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
          isCorrect: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji secara terbatas dengan memasang panah arah di setiap persimpangan.",
        },
        {
          isCorrect: false,
          label:
            "Pengamatan itu membuktikan bahwa panah arah di setiap persimpangan menyebabkan perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur pameran karya siswa sebelum melakukan pengukuran ulang.",
        },
        {
          isCorrect: false,
          label:
            "Pola awal itu membenarkan penerapan tetap panah arah di setiap persimpangan.",
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
