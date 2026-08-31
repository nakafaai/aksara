import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team testete die Änderung kontrastreichere Sammelplatzsymbole an ausgewählten Tagen, weil das frühere Verfahren bereits als unwirksam galt.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte die Änderung kontrastreichere Sammelplatzsymbole dauerhaft ein, während das frühere Verfahren nur in den Rückmeldungen erhalten blieb.",
        },
        {
          isCorrect: true,
          label:
            "Das Team prüfte kontrastreichere Symbole für Sammelpunkte an ausgewählten Tagen, während an Vergleichstagen der bisherige Ablauf bestehen blieb.",
        },
        {
          isCorrect: false,
          label:
            "Das Team testete die Änderung kontrastreichere Sammelplatzsymbole und das frühere Verfahren an denselben Tagen ohne getrennte Vergleichsbedingungen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich Tage mit der Änderung kontrastreichere Sammelplatzsymbole mit Rückmeldungen zum früheren Verfahren.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team tested higher-contrast assembly-point symbols on selected days because the earlier process had already been proved ineffective.",
        },
        {
          isCorrect: false,
          label:
            "The team tested higher-contrast assembly-point symbols permanently, while the earlier process remained only in user records.",
        },
        {
          isCorrect: true,
          label:
            "The team tested higher-contrast assembly-point symbols on selected days, while the earlier process remained on comparison days.",
        },
        {
          isCorrect: false,
          label:
            "The team tested higher-contrast assembly-point symbols and the earlier process on the same days without separate comparison conditions.",
        },
        {
          isCorrect: false,
          label:
            "The team compared selected days using higher-contrast assembly-point symbols with comments about the earlier process.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menguji simbol titik kumpul dengan kontras lebih tinggi pada hari tertentu karena proses lama telah terbukti tidak efektif.",
        },
        {
          isCorrect: false,
          label:
            "Tim menerapkan simbol titik kumpul dengan kontras lebih tinggi secara tetap, sedangkan proses lama hanya tersisa dalam catatan pengguna.",
        },
        {
          isCorrect: true,
          label:
            "Tim menguji simbol titik kumpul yang lebih kontras pada hari tertentu, sedangkan alur lama tetap digunakan pada hari pembanding.",
        },
        {
          isCorrect: false,
          label:
            "Tim menguji simbol titik kumpul dengan kontras lebih tinggi dan proses lama pada hari yang sama tanpa kondisi pembanding terpisah.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan hari penggunaan simbol titik kumpul dengan kontras lebih tinggi dengan komentar tentang proses lama.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
