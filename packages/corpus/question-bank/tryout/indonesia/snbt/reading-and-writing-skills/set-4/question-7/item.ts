import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team testete die Änderung Fotobeschriftungen an den Rückgaberegalen an ausgewählten Tagen, weil das frühere Verfahren bereits als unwirksam galt.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte die Änderung Fotobeschriftungen an den Rückgaberegalen dauerhaft ein, während das frühere Verfahren nur in den Rückmeldungen erhalten blieb.",
        },
        {
          isCorrect: false,
          label:
            "Das Team testete die Änderung Fotobeschriftungen an den Rückgaberegalen und das frühere Verfahren an denselben Tagen ohne getrennte Vergleichsbedingungen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich Tage mit der Änderung Fotobeschriftungen an den Rückgaberegalen mit Rückmeldungen zum früheren Verfahren.",
        },
        {
          isCorrect: true,
          label:
            "Das Team prüfte Fotoetiketten an den Rückgaberegalen an ausgewählten Tagen, während an Vergleichstagen der bisherige Ablauf bestehen blieb.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team tested photo labels on the return shelves on selected days because the earlier process had already been proved ineffective.",
        },
        {
          isCorrect: false,
          label:
            "The team tested photo labels on the return shelves permanently, while the earlier process remained only in user records.",
        },
        {
          isCorrect: false,
          label:
            "The team tested photo labels on the return shelves and the earlier process on the same days without separate comparison conditions.",
        },
        {
          isCorrect: false,
          label:
            "The team compared selected days using photo labels on the return shelves with comments about the earlier process.",
        },
        {
          isCorrect: true,
          label:
            "The team tested photo labels on the return shelves on selected days, while the earlier process remained on comparison days.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menguji label foto pada rak pengembalian pada hari tertentu karena proses lama telah terbukti tidak efektif.",
        },
        {
          isCorrect: false,
          label:
            "Tim menerapkan label foto pada rak pengembalian secara tetap, sedangkan proses lama hanya tersisa dalam catatan pengguna.",
        },
        {
          isCorrect: false,
          label:
            "Tim menguji label foto pada rak pengembalian dan proses lama pada hari yang sama tanpa kondisi pembanding terpisah.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan hari penggunaan label foto pada rak pengembalian dengan komentar tentang proses lama.",
        },
        {
          isCorrect: true,
          label:
            "Tim menguji label foto pada hari tertentu, sedangkan alur lama tetap digunakan pada hari pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
