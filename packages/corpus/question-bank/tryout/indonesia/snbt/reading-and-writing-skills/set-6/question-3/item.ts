import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die Hypothese musste deshalb mit Richtungspfeilen an den Flurabzweigungen geprüft werden.",
        },
        {
          isCorrect: false,
          label:
            "Die Ausgangsdaten bewiesen, dass Pfeile den Unterschied bei abgeschlossenen Rundgängen verursachten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team musste vor der nächsten Messung mehrere Ausstellungsmerkmale gleichzeitig ändern.",
        },
        {
          isCorrect: false,
          label:
            "Das Ausgangsmuster rechtfertigte die dauerhafte Anbringung der Pfeile.",
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
          isCorrect: true,
          label:
            "The hypothesis therefore needed to be tested by placing direction arrows at corridor junctions.",
        },
        {
          isCorrect: false,
          label:
            "The baseline proved that arrows caused the difference in route completion.",
        },
        {
          isCorrect: false,
          label:
            "The team needed to change several exhibition features at once before measuring again.",
        },
        {
          isCorrect: false,
          label:
            "The baseline pattern justified installing arrows permanently.",
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
          isCorrect: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji dengan memasang panah arah di persimpangan lorong.",
        },
        {
          isCorrect: false,
          label:
            "Pengamatan awal membuktikan bahwa panah menyebabkan perbedaan penyelesaian rute.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur pameran sekaligus sebelum mengukur ulang.",
        },
        {
          isCorrect: false,
          label: "Pola awal membenarkan pemasangan panah secara permanen.",
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
