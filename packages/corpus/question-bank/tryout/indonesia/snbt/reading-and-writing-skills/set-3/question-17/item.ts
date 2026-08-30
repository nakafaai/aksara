import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wiederholte erneut noch einmal den Versuch zu Karten zur Reihenfolge brauner und grüner Materialien, um belastbarere Belege zu erhalten.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wiederholte den Versuch mit folgender Änderung, um belastbarere Belege zu erhalten: Karten zur Reihenfolge brauner und grüner Materialien.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte eine Wiederholung des Versuchs zu Karten zur Reihenfolge brauner und grüner Materialien mit dem Ziel durch, damit belastbarere Belege erhalten werden können.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Versuch zu Karten zur Reihenfolge brauner und grüner Materialien, um sehr viel belastbarere stärkere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Eine Wiederholung wurde vom Team erneut für Karten zur Reihenfolge brauner und grüner Materialien durchgeführt, und zwar für Belege.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team repeated the test of cards showing the order of brown and green materials again once more to obtain stronger evidence.",
        },
        {
          isCorrect: true,
          label:
            "The team repeated the test of cards showing the order of brown and green materials to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team carried out a repetition of the test of cards showing the order of brown and green materials for the purpose of being able to obtain evidence that was stronger.",
        },
        {
          isCorrect: false,
          label:
            "The team repeated the test of cards showing the order of brown and green materials to obtain very much stronger and more strong evidence.",
        },
        {
          isCorrect: false,
          label:
            "A repetition was repeated by the team for cards showing the order of brown and green materials in order for evidence.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim mengulang kembali lagi uji kartu urutan bahan cokelat dan hijau untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengulang uji kartu urutan bahan cokelat dan hijau untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim melakukan pengulangan atas uji kartu urutan bahan cokelat dan hijau dengan tujuan agar supaya dapat memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengulang uji kartu urutan bahan cokelat dan hijau untuk memperoleh bukti yang lebih sangat kuat sekali.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan kembali dilakukan lagi oleh tim atas kartu urutan bahan cokelat dan hijau untuk bukti.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
