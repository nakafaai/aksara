import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Beobachtung bewies, dass kontrastreichere Symbole den Unterschied verursachten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team musste vor der nächsten Messung mehrere Kartenmerkmale gleichzeitig ändern.",
        },
        {
          isCorrect: false,
          label:
            "Das Ausgangsmuster rechtfertigte bereits die dauerhafte Einführung kontrastreicherer Symbole.",
        },
        {
          isCorrect: true,
          label:
            "Die Hypothese musste deshalb mit kontrastreicheren Sammelpunktsymbolen geprüft werden.",
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
            "The observation proved that higher-contrast symbols caused the difference.",
        },
        {
          isCorrect: false,
          label:
            "The team needed to change several map features at once before measuring again.",
        },
        {
          isCorrect: false,
          label:
            "The baseline pattern already justified adopting higher-contrast symbols permanently.",
        },
        {
          isCorrect: true,
          label:
            "The hypothesis therefore needed to be tested using higher-contrast assembly-point symbols.",
        },
        {
          isCorrect: false,
          label:
            "The remaining uncertainty made a further comparison unnecessary.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengamatan itu membuktikan bahwa simbol yang lebih kontras menyebabkan perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur peta sekaligus sebelum mengukur ulang.",
        },
        {
          isCorrect: false,
          label:
            "Pola awal itu sudah membenarkan penerapan permanen simbol yang lebih kontras.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji dengan simbol titik kumpul yang lebih kontras.",
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
