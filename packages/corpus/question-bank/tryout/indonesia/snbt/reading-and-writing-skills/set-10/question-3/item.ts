import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Beobachtung bewies daher, dass die Änderung nach Rezeptschritten gruppierte Zutaten den Unterschied verursachte.",
        },
        {
          isCorrect: false,
          label:
            "Das Team musste daher mehrere Merkmale im Kontext Kochkurs für Jugendliche ändern, bevor es erneut maß.",
        },
        {
          isCorrect: false,
          label:
            "Das erste Muster rechtfertigte daher die dauerhafte Einführung von nach Rezeptschritten gruppierte Zutaten.",
        },
        {
          isCorrect: true,
          label:
            "Die Hypothese musste deshalb mit folgender Änderung in einem begrenzten Versuch geprüft werden: nach Rezeptschritten geordnete Zutaten.",
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
            "The observation therefore established that ingredients grouped by recipe stage caused the difference.",
        },
        {
          isCorrect: false,
          label:
            "The team therefore needed to alter several features of teen cooking class before measuring again.",
        },
        {
          isCorrect: false,
          label:
            "The initial pattern therefore justified permanent adoption of ingredients grouped by recipe stage.",
        },
        {
          isCorrect: true,
          label:
            "The hypothesis therefore needed a limited test of ingredients grouped by recipe stage.",
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
            "Pengamatan itu membuktikan bahwa bahan yang dikelompokkan menurut tahap resep menyebabkan perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur kelas memasak remaja sebelum melakukan pengukuran ulang.",
        },
        {
          isCorrect: false,
          label:
            "Pola awal itu membenarkan penerapan tetap bahan yang dikelompokkan menurut tahap resep.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji secara terbatas melalui bahan yang dikelompokkan menurut tahap resep.",
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
