import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team testete die Änderung Fragekarten an jedem Demonstrationstisch an ausgewählten Tagen, weil das frühere Verfahren bereits als unwirksam galt.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte die Änderung Fragekarten an jedem Demonstrationstisch dauerhaft ein, während das frühere Verfahren nur in den Rückmeldungen erhalten blieb.",
        },
        {
          isCorrect: false,
          label:
            "Das Team testete die Änderung Fragekarten an jedem Demonstrationstisch und das frühere Verfahren an denselben Tagen ohne getrennte Vergleichsbedingungen.",
        },
        {
          isCorrect: true,
          label:
            "Das Team prüfte Fragekarten an jedem Demonstrationstisch an ausgewählten Tagen, während an Vergleichstagen der bisherige Ablauf bestehen blieb.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich Tage mit der Änderung Fragekarten an jedem Demonstrationstisch mit Rückmeldungen zum früheren Verfahren.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team tested question cards at each demonstration table on selected days because the earlier process had already been proved ineffective.",
        },
        {
          isCorrect: false,
          label:
            "The team tested question cards at each demonstration table permanently, while the earlier process remained only in user records.",
        },
        {
          isCorrect: false,
          label:
            "The team tested question cards at each demonstration table and the earlier process on the same days without separate comparison conditions.",
        },
        {
          isCorrect: true,
          label:
            "The team tested question cards at each demonstration table on selected days, while the earlier process remained on comparison days.",
        },
        {
          isCorrect: false,
          label:
            "The team compared selected days using question cards at each demonstration table with comments about the earlier process.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menguji kartu pertanyaan di setiap meja demonstrasi pada hari tertentu karena proses lama telah terbukti tidak efektif.",
        },
        {
          isCorrect: false,
          label:
            "Tim menerapkan kartu pertanyaan di setiap meja demonstrasi secara tetap, sedangkan proses lama hanya tersisa dalam catatan pengguna.",
        },
        {
          isCorrect: false,
          label:
            "Tim menguji kartu pertanyaan di setiap meja demonstrasi dan proses lama pada hari yang sama tanpa kondisi pembanding terpisah.",
        },
        {
          isCorrect: true,
          label:
            "Tim menguji kartu pertanyaan untuk setiap meja demonstrasi pada hari tertentu, sedangkan alur lama tetap digunakan pada hari pembanding.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan hari penggunaan kartu pertanyaan di setiap meja demonstrasi dengan komentar tentang proses lama.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
