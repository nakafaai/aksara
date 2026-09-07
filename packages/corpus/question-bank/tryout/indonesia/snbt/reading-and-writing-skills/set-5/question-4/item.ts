import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Beispielfotos sollten die weitere Messung der Übereinstimmung überflüssig machen.",
        },
        {
          isCorrect: true,
          label:
            "Beispielfotos sollten die schriftlichen Kategorien verdeutlichen, die zuvor zu unterschiedlichen Einschätzungen geführt hatten.",
        },
        {
          isCorrect: false,
          label:
            "Beispielfotos sollten gleichzeitige Änderungen mehrerer Erfassungsmerkmale ermöglichen.",
        },
        {
          isCorrect: false,
          label:
            "Beispielfotos wurden gewählt, weil bereits alle Vergleichswerte nachweislich gleich waren.",
        },
        {
          isCorrect: false,
          label:
            "Beispielfotos wurden nur gewählt, weil das endgültige Testergebnis bereits feststand.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sample photographs were chosen so that observer agreement would no longer need measuring.",
        },
        {
          isCorrect: true,
          label:
            "Sample photographs were chosen to clarify the written categories that had led to differing assessments.",
        },
        {
          isCorrect: false,
          label:
            "Sample photographs were chosen so that several survey features could change at once.",
        },
        {
          isCorrect: false,
          label:
            "Sample photographs were chosen because all comparison values had already proved identical.",
        },
        {
          isCorrect: false,
          label:
            "Sample photographs were chosen only because the final test result was already certain.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Contoh foto dipilih agar kesepakatan pencatat tidak perlu diukur lagi.",
        },
        {
          isCorrect: true,
          label:
            "Contoh foto dipilih untuk memperjelas kategori tertulis yang sebelumnya menghasilkan perbedaan penilaian.",
        },
        {
          isCorrect: false,
          label:
            "Contoh foto dipilih agar beberapa unsur pendataan dapat diubah sekaligus.",
        },
        {
          isCorrect: false,
          label:
            "Contoh foto dipilih karena semua nilai pembanding sudah terbukti sama.",
        },
        {
          isCorrect: false,
          label:
            "Contoh foto dipilih hanya karena hasil akhir pengujian sudah dipastikan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
