import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wiederholte erneut noch einmal den Versuch zu kleine Karten mit Gehzeiten, um belastbarere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte eine Wiederholung des Versuchs zu kleine Karten mit Gehzeiten mit dem Ziel durch, damit belastbarere Belege erhalten werden können.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Versuch zu kleine Karten mit Gehzeiten, um sehr viel belastbarere stärkere Belege zu erhalten.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wiederholte den Versuch mit folgender Änderung, um belastbarere Belege zu erhalten: kleine Karten mit Gehzeiten.",
        },
        {
          isCorrect: false,
          label:
            "Eine Wiederholung wurde vom Team erneut für kleine Karten mit Gehzeiten durchgeführt, und zwar für Belege.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team repeated the test of small maps showing walking times again once more to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team carried out a repetition of the test of small maps showing walking times for the purpose of being able to obtain evidence that was stronger.",
        },
        {
          isCorrect: false,
          label:
            "The team repeated the test of small maps showing walking times to obtain very much stronger and more strong evidence.",
        },
        {
          isCorrect: true,
          label:
            "The team repeated the test of small maps showing walking times to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "A repetition was repeated by the team for small maps showing walking times in order for evidence.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim mengulang kembali lagi uji peta kecil yang menampilkan waktu tempuh untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim melakukan pengulangan atas uji peta kecil yang menampilkan waktu tempuh dengan tujuan agar supaya dapat memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengulang uji peta kecil yang menampilkan waktu tempuh untuk memperoleh bukti yang lebih sangat kuat sekali.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengulang uji peta kecil yang menampilkan waktu tempuh untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan kembali dilakukan lagi oleh tim atas peta kecil yang menampilkan waktu tempuh untuk bukti.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
