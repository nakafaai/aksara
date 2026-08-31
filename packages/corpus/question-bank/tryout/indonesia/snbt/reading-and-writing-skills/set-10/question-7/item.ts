import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team testete die Änderung nach Rezeptschritten gruppierte Zutaten an ausgewählten Tagen, weil das frühere Verfahren bereits als unwirksam galt.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte die Änderung nach Rezeptschritten gruppierte Zutaten dauerhaft ein, während das frühere Verfahren nur in den Rückmeldungen erhalten blieb.",
        },
        {
          isCorrect: true,
          label:
            "Das Team prüfte nach Rezeptschritten geordnete Zutaten an ausgewählten Tagen, während an Vergleichstagen der bisherige Ablauf bestehen blieb.",
        },
        {
          isCorrect: false,
          label:
            "Das Team testete die Änderung nach Rezeptschritten gruppierte Zutaten und das frühere Verfahren an denselben Tagen ohne getrennte Vergleichsbedingungen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich Tage mit der Änderung nach Rezeptschritten gruppierte Zutaten mit Rückmeldungen zum früheren Verfahren.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team tested ingredients grouped by recipe stage on selected days because the earlier process had already been proved ineffective.",
        },
        {
          isCorrect: false,
          label:
            "The team tested ingredients grouped by recipe stage permanently, while the earlier process remained only in user records.",
        },
        {
          isCorrect: true,
          label:
            "The team tested ingredients grouped by recipe stage on selected days, while the earlier process remained on comparison days.",
        },
        {
          isCorrect: false,
          label:
            "The team tested ingredients grouped by recipe stage and the earlier process on the same days without separate comparison conditions.",
        },
        {
          isCorrect: false,
          label:
            "The team compared selected days using ingredients grouped by recipe stage with comments about the earlier process.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menguji bahan yang dikelompokkan menurut tahap resep pada hari tertentu karena proses lama telah terbukti tidak efektif.",
        },
        {
          isCorrect: false,
          label:
            "Tim menerapkan bahan yang dikelompokkan menurut tahap resep secara tetap, sedangkan proses lama hanya tersisa dalam catatan pengguna.",
        },
        {
          isCorrect: true,
          label:
            "Tim menguji bahan yang dikelompokkan menurut tahap resep pada hari tertentu, sedangkan alur lama tetap digunakan pada hari pembanding.",
        },
        {
          isCorrect: false,
          label:
            "Tim menguji bahan yang dikelompokkan menurut tahap resep dan proses lama pada hari yang sama tanpa kondisi pembanding terpisah.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan hari penggunaan bahan yang dikelompokkan menurut tahap resep dengan komentar tentang proses lama.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
