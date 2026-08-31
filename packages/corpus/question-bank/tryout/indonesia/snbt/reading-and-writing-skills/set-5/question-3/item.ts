import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Beobachtung bewies daher, dass die Änderung Beispielfotos für jede Zustandskategorie den Unterschied verursachte.",
        },
        {
          isCorrect: false,
          label:
            "Das Team musste daher mehrere Merkmale im Kontext Straßenbaumerhebung ändern, bevor es erneut maß.",
        },
        {
          isCorrect: false,
          label:
            "Das erste Muster rechtfertigte daher die dauerhafte Einführung von Beispielfotos für jede Zustandskategorie.",
        },
        {
          isCorrect: true,
          label:
            "Die Hypothese musste deshalb mit folgender Änderung in einem begrenzten Versuch geprüft werden: Beispielfotos für jede Zustandskategorie.",
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
            "The observation therefore established that sample photos for each condition category caused the difference.",
        },
        {
          isCorrect: false,
          label:
            "The team therefore needed to alter several features of street-tree survey before measuring again.",
        },
        {
          isCorrect: false,
          label:
            "The initial pattern therefore justified permanent adoption of sample photos for each condition category.",
        },
        {
          isCorrect: true,
          label:
            "The hypothesis therefore needed a limited test of sample photos for each condition category.",
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
            "Pengamatan itu membuktikan bahwa foto contoh untuk setiap kategori kondisi menyebabkan perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur survei pohon jalan sebelum melakukan pengukuran ulang.",
        },
        {
          isCorrect: false,
          label:
            "Pola awal itu membenarkan penerapan tetap foto contoh untuk setiap kategori kondisi.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji secara terbatas melalui contoh foto untuk setiap kategori kondisi.",
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
