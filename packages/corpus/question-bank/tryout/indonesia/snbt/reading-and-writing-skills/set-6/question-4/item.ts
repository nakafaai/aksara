import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Pfeile sollten die weitere Messung abgeschlossener Rundgänge überflüssig machen.",
        },
        {
          isCorrect: false,
          label:
            "Die Pfeile sollten gleichzeitige Änderungen vieler Ausstellungsmerkmale ermöglichen.",
        },
        {
          isCorrect: false,
          label:
            "Die Pfeile wurden gewählt, weil bereits alle Vergleichswerte nachweislich gleich waren.",
        },
        {
          isCorrect: false,
          label:
            "Die Pfeile wurden nur gewählt, weil das endgültige Testergebnis bereits feststand.",
        },
        {
          isCorrect: true,
          label:
            "Die Pfeile sollten den Besuchenden helfen, dem Rundgang durch die verzweigten Flure zu folgen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Arrows were chosen so that route completion would no longer need measuring.",
        },
        {
          isCorrect: false,
          label:
            "Arrows were chosen so that many exhibition features could change at once.",
        },
        {
          isCorrect: false,
          label:
            "Arrows were chosen because all comparison values had already proved equal.",
        },
        {
          isCorrect: false,
          label:
            "Arrows were chosen only because the final test result was already certain.",
        },
        {
          isCorrect: true,
          label:
            "Arrows were chosen to help visitors follow the route through branching corridors.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Panah dipilih agar penyelesaian rute tidak perlu diukur lagi.",
        },
        {
          isCorrect: false,
          label:
            "Panah dipilih agar banyak unsur pameran dapat diubah sekaligus.",
        },
        {
          isCorrect: false,
          label:
            "Panah dipilih karena semua nilai pembanding telah terbukti sama.",
        },
        {
          isCorrect: false,
          label:
            "Panah dipilih hanya karena hasil akhir pengujiannya telah dipastikan.",
        },
        {
          isCorrect: true,
          label:
            "Panah dipilih untuk membantu pengunjung mengikuti rute di lorong bercabang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
