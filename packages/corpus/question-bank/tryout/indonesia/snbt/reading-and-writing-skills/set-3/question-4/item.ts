import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Kontrastreichere Symbole sollten es den Teilnehmenden erleichtern, die Schilder zu unterscheiden.",
        },
        {
          isCorrect: false,
          label:
            "Kontrastreichere Symbole machten eine Messung des Erfolgs der Teilnehmenden überflüssig.",
        },
        {
          isCorrect: false,
          label:
            "Kontrastreichere Symbole erlaubten dem Team, viele Bedingungen gleichzeitig zu ändern.",
        },
        {
          isCorrect: false,
          label:
            "Kontrastreichere Symbole erklärten, warum alle Vergleichswerte identisch waren.",
        },
        {
          isCorrect: false,
          label:
            "Kontrastreichere Symbole wurden nur gewählt, weil das Endergebnis bereits feststand.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Higher-contrast symbols were selected to address participants’ difficulty distinguishing the signs.",
        },
        {
          isCorrect: false,
          label:
            "Higher-contrast symbols removed the need to measure participants’ success.",
        },
        {
          isCorrect: false,
          label:
            "Higher-contrast symbols allowed the team to change many conditions at once.",
        },
        {
          isCorrect: false,
          label:
            "Higher-contrast symbols explained why all comparison values were identical.",
        },
        {
          isCorrect: false,
          label:
            "Higher-contrast symbols were selected only because the final result was already certain.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Simbol yang lebih kontras dipilih untuk mengatasi kesulitan peserta membedakan penanda.",
        },
        {
          isCorrect: false,
          label:
            "Simbol yang lebih kontras menghapus kebutuhan untuk mengukur keberhasilan peserta.",
        },
        {
          isCorrect: false,
          label:
            "Simbol yang lebih kontras memungkinkan tim mengubah banyak kondisi sekaligus.",
        },
        {
          isCorrect: false,
          label:
            "Simbol yang lebih kontras menjelaskan mengapa semua nilai pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Simbol yang lebih kontras dipilih hanya karena hasil akhirnya sudah dipastikan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
