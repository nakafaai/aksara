import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Fotoetiketten sollten eine Messung der richtigen Rückgaben überflüssig machen.",
        },
        {
          isCorrect: false,
          label:
            "Fotoetiketten sollten dem Team die gleichzeitige Änderung vieler Bedingungen ermöglichen.",
        },
        {
          isCorrect: false,
          label:
            "Fotoetiketten wurden gewählt, weil alle Vergleichswerte bereits nachweislich gleich waren.",
        },
        {
          isCorrect: false,
          label:
            "Fotoetiketten wurden nur gewählt, weil das Endergebnis des Versuchs bereits feststand.",
        },
        {
          isCorrect: true,
          label:
            "Fotoetiketten sollten den Ausleihenden helfen, das richtige Rückgaberegal zu erkennen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Photo labels were selected to remove the need to measure correct returns.",
        },
        {
          isCorrect: false,
          label:
            "Photo labels were selected to let the team change many conditions simultaneously.",
        },
        {
          isCorrect: false,
          label:
            "Photo labels were selected because all comparison values had already proved identical.",
        },
        {
          isCorrect: false,
          label:
            "Photo labels were selected only because the final test result was already certain.",
        },
        {
          isCorrect: true,
          label:
            "Photo labels were selected to help borrowers identify the correct return shelf.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Label foto dipilih agar keberhasilan pengembalian tidak perlu diukur lagi.",
        },
        {
          isCorrect: false,
          label:
            "Label foto dipilih agar tim dapat mengubah banyak kondisi sekaligus.",
        },
        {
          isCorrect: false,
          label:
            "Label foto dipilih karena semua nilai pembanding sudah terbukti sama.",
        },
        {
          isCorrect: false,
          label:
            "Label foto dipilih hanya karena hasil akhir uji sudah dipastikan.",
        },
        {
          isCorrect: true,
          label:
            "Label foto dipilih untuk membantu peminjam mengenali rak pengembalian yang tepat.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
