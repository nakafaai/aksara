import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team testete die Änderung Menüvorbestellung am Vortag an ausgewählten Tagen, weil das frühere Verfahren bereits als unwirksam galt.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte die Änderung Menüvorbestellung am Vortag dauerhaft ein, während das frühere Verfahren nur in den Rückmeldungen erhalten blieb.",
        },
        {
          isCorrect: false,
          label:
            "Das Team testete die Änderung Menüvorbestellung am Vortag und das frühere Verfahren an denselben Tagen ohne getrennte Vergleichsbedingungen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich Tage mit der Änderung Menüvorbestellung am Vortag mit Rückmeldungen zum früheren Verfahren.",
        },
        {
          isCorrect: true,
          label:
            "Das Team prüfte Menübestellung am Vortag an ausgewählten Tagen, während an Vergleichstagen der bisherige Ablauf bestehen blieb.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team tested menu booking one day in advance on selected days because the earlier process had already been proved ineffective.",
        },
        {
          isCorrect: false,
          label:
            "The team tested menu booking one day in advance permanently, while the earlier process remained only in user records.",
        },
        {
          isCorrect: false,
          label:
            "The team tested menu booking one day in advance and the earlier process on the same days without separate comparison conditions.",
        },
        {
          isCorrect: false,
          label:
            "The team compared selected days using menu booking one day in advance with comments about the earlier process.",
        },
        {
          isCorrect: true,
          label:
            "The team tested menu booking one day in advance on selected days, while the earlier process remained on comparison days.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menguji pemesanan menu sehari sebelumnya pada hari tertentu karena proses lama telah terbukti tidak efektif.",
        },
        {
          isCorrect: false,
          label:
            "Tim menerapkan pemesanan menu sehari sebelumnya secara tetap, sedangkan proses lama hanya tersisa dalam catatan pengguna.",
        },
        {
          isCorrect: false,
          label:
            "Tim menguji pemesanan menu sehari sebelumnya dan proses lama pada hari yang sama tanpa kondisi pembanding terpisah.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan hari penggunaan pemesanan menu sehari sebelumnya dengan komentar tentang proses lama.",
        },
        {
          isCorrect: true,
          label:
            "Tim menguji pemesanan menu sehari sebelumnya pada hari tertentu, sedangkan alur lama tetap digunakan pada hari pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
