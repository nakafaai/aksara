import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Fragekarten machten die Zählung fragender Besuchender überflüssig.",
        },
        {
          isCorrect: false,
          label:
            "Fragekarten ermöglichten die gleichzeitige Änderung vieler Merkmale der Führung.",
        },
        {
          isCorrect: true,
          label:
            "Die zwei Einstiegsfragen jeder Karte boten einen konkreteren Ausgangspunkt als die Aufforderung, irgendetwas zu fragen.",
        },
        {
          isCorrect: false,
          label:
            "Die Karten wurden gewählt, weil bereits alle Vergleichswerte nachweislich gleich waren.",
        },
        {
          isCorrect: false,
          label:
            "Die Karten wurden nur gewählt, weil das endgültige Testergebnis bereits feststand.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Question cards made it unnecessary to count visitors who asked questions.",
        },
        {
          isCorrect: false,
          label: "Question cards allowed many tour features to change at once.",
        },
        {
          isCorrect: true,
          label:
            "The two opening questions on each card gave visitors a more specific starting point than an invitation to ask anything.",
        },
        {
          isCorrect: false,
          label:
            "The cards were chosen because all comparison values had proved equal.",
        },
        {
          isCorrect: false,
          label:
            "The cards were chosen only because the final test result was already certain.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kartu pertanyaan membuat jumlah pengunjung yang bertanya tidak perlu diukur.",
        },
        {
          isCorrect: false,
          label:
            "Kartu pertanyaan memungkinkan banyak unsur tur diubah sekaligus.",
        },
        {
          isCorrect: true,
          label:
            "Dua pertanyaan awal pada kartu memberi pengunjung titik awal yang lebih khusus daripada undangan untuk bertanya apa saja.",
        },
        {
          isCorrect: false,
          label:
            "Kartu dipilih karena semua nilai pembanding sudah terbukti sama.",
        },
        {
          isCorrect: false,
          label:
            "Kartu dipilih hanya karena hasil akhir pengujiannya telah dipastikan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
