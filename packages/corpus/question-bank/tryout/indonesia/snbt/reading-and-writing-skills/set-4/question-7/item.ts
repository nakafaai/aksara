import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team ergänzte Fotos bei den Versuchsterminen, weil Buchstabencodes bereits nachweislich nutzlos waren.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte Fotos dauerhaft ein, während Buchstabencodes nur in den Aufzeichnungen erhalten blieben.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verwendete bei allen Terminen Fotos und Buchstabencodes ohne getrennte Vergleichsbedingung.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich Termine mit Fotos nur mit Rückmeldungen zu den alten Buchstabencodes.",
        },
        {
          isCorrect: true,
          label:
            "Bei den Versuchsterminen zeigten die Regale Fotos neben Buchstabencodes, während bei den Vergleichsterminen nur die Codes zu sehen waren.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team added photographs in trial sessions because letter codes had already proved useless.",
        },
        {
          isCorrect: false,
          label:
            "The team installed photographs permanently, while letter codes remained only in records.",
        },
        {
          isCorrect: false,
          label:
            "The team used photographs and letter codes in every session without a separate comparison condition.",
        },
        {
          isCorrect: false,
          label:
            "The team compared sessions with photographs only with comments about the old letter codes.",
        },
        {
          isCorrect: true,
          label:
            "Shelves displayed photographs alongside letter codes in trial sessions, while comparison sessions used only letter codes.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menambahkan foto pada sesi uji karena kode huruf sudah terbukti tidak berguna.",
        },
        {
          isCorrect: false,
          label:
            "Tim memasang foto secara permanen, sedangkan kode huruf hanya tersisa dalam catatan.",
        },
        {
          isCorrect: false,
          label:
            "Tim memakai foto dan kode huruf pada semua sesi tanpa kondisi pembanding terpisah.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan sesi berlabel foto hanya dengan komentar tentang kode huruf lama.",
        },
        {
          isCorrect: true,
          label:
            "Pada sesi uji, rak menampilkan foto beserta kode huruf, sedangkan pada sesi pembanding hanya kode huruf.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
