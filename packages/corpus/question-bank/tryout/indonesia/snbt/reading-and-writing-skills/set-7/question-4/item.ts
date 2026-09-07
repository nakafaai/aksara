import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Vorbestellungen sollten die weitere Messung der Übereinstimmung überflüssig machen.",
        },
        {
          isCorrect: false,
          label:
            "Vorbestellungen sollten gleichzeitige Änderungen vieler Programmmerkmale ermöglichen.",
        },
        {
          isCorrect: true,
          label:
            "Bestellungen am Vortag sollten die Menüwahl bekannt machen, bevor die Schülerinnen und Schüler an der Ausgabe ankamen.",
        },
        {
          isCorrect: false,
          label:
            "Vorbestellungen wurden gewählt, weil bereits alle Vergleichswerte nachweislich gleich waren.",
        },
        {
          isCorrect: false,
          label:
            "Vorbestellungen wurden nur gewählt, weil das endgültige Testergebnis bereits feststand.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Advance ordering was chosen so that order matching would no longer need measuring.",
        },
        {
          isCorrect: false,
          label:
            "Advance ordering was chosen so that many programme features could change at once.",
        },
        {
          isCorrect: true,
          label:
            "Previous-day ordering was chosen so that students' choices would be known before they reached the serving table.",
        },
        {
          isCorrect: false,
          label:
            "Advance ordering was chosen because all comparison values had already proved equal.",
        },
        {
          isCorrect: false,
          label:
            "Advance ordering was chosen only because the final test result was already certain.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pemesanan awal dipilih agar kesesuaian pesanan tidak perlu diukur lagi.",
        },
        {
          isCorrect: false,
          label:
            "Pemesanan awal dipilih agar banyak unsur program dapat diubah sekaligus.",
        },
        {
          isCorrect: true,
          label:
            "Pemesanan sehari sebelumnya dipilih agar pilihan siswa diketahui sebelum mereka tiba di meja saji.",
        },
        {
          isCorrect: false,
          label:
            "Pemesanan awal dipilih karena semua nilai pembanding sudah terbukti sama.",
        },
        {
          isCorrect: false,
          label:
            "Pemesanan awal dipilih hanya karena hasil akhir pengujiannya sudah dipastikan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
