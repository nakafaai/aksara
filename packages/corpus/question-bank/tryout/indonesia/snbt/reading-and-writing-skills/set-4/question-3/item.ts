import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Ausgangsbeobachtung bewies, dass Fotoetiketten den Ergebnisunterschied verursachten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team musste vor der nächsten Messung mehrere Merkmale des Dienstes gleichzeitig ändern.",
        },
        {
          isCorrect: false,
          label:
            "Das Ausgangsmuster rechtfertigte die dauerhafte Einführung von Fotoetiketten.",
        },
        {
          isCorrect: false,
          label:
            "Die verbleibende Unsicherheit machte einen weiteren Vergleich überflüssig.",
        },
        {
          isCorrect: true,
          label:
            "Die Hypothese musste deshalb durch zusätzliche Fotoetiketten an den Regalen geprüft werden.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The baseline observation proved that photo labels caused the difference in results.",
        },
        {
          isCorrect: false,
          label:
            "The team needed to change several service features at once before measuring again.",
        },
        {
          isCorrect: false,
          label:
            "The baseline pattern justified adopting photo labels permanently.",
        },
        {
          isCorrect: false,
          label:
            "The remaining uncertainty made a further comparison unnecessary.",
        },
        {
          isCorrect: true,
          label:
            "The hypothesis therefore needed to be tested by adding photo labels to the shelves.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengamatan awal membuktikan bahwa label foto menyebabkan perbedaan hasil.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur layanan sekaligus sebelum mengukur ulang.",
        },
        {
          isCorrect: false,
          label: "Pola awal membenarkan penerapan permanen label foto.",
        },
        {
          isCorrect: false,
          label:
            "Ketidakpastian yang tersisa membuat perbandingan lanjutan tidak diperlukan.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji dengan menambahkan label foto pada rak.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
