import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Test von Karten zur Reihenfolge brauner und grüner Materialien erneut, um stärkere Belege als zuvor zu erhalten.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wiederholte den Versuch mit folgender Änderung, um belastbarere Belege zu erhalten: Karten zur Reihenfolge brauner und grüner Materialien.",
        },
        {
          isCorrect: false,
          label:
            "Um stärkere Belege zu erhalten, wurde der Test von Karten zur Reihenfolge brauner und grüner Materialien vom Team erneut wiederholt.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte eine weitere Wiederholung des Tests von Karten zur Reihenfolge brauner und grüner Materialien für stärkere Belege durch.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Test, um stärkere Belege zu Karten zur Reihenfolge brauner und grüner Materialien zu erhalten, die es bereits getestet hatte.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team repeated the test of cards showing the order of brown and green materials again to obtain evidence that was stronger than before.",
        },
        {
          isCorrect: true,
          label:
            "The team repeated the test of cards showing the order of brown and green materials to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "To obtain stronger evidence, the test of cards showing the order of brown and green materials was repeated again by the team.",
        },
        {
          isCorrect: false,
          label:
            "The team carried out another repetition of the test of cards showing the order of brown and green materials for stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team repeated the test to obtain stronger evidence about cards showing the order of brown and green materials, which it had already tested.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim mengulang kembali uji kartu urutan bahan cokelat dan hijau untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengulang uji kartu urutan bahan cokelat dan hijau untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Untuk memperoleh bukti lebih kuat, uji kartu urutan bahan cokelat dan hijau diulang kembali oleh tim.",
        },
        {
          isCorrect: false,
          label:
            "Tim melakukan pengulangan lain atas uji kartu urutan bahan cokelat dan hijau demi bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengulang uji untuk memperoleh bukti lebih kuat tentang kartu urutan bahan cokelat dan hijau yang telah diuji sebelumnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
