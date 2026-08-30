import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wiederholte erneut noch einmal den Versuch zu ein Formular mit strukturierten Ortsangaben, um belastbarere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte eine Wiederholung des Versuchs zu ein Formular mit strukturierten Ortsangaben mit dem Ziel durch, damit belastbarere Belege erhalten werden können.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wiederholte den Versuch mit folgender Änderung, um belastbarere Belege zu erhalten: ein Formular mit strukturierten Ortsangaben.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Versuch zu ein Formular mit strukturierten Ortsangaben, um sehr viel belastbarere stärkere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Eine Wiederholung wurde vom Team erneut für ein Formular mit strukturierten Ortsangaben durchgeführt, und zwar für Belege.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team repeated the test of a form with structured location choices again once more to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team carried out a repetition of the test of a form with structured location choices for the purpose of being able to obtain evidence that was stronger.",
        },
        {
          isCorrect: true,
          label:
            "The team repeated the test of a form with structured location choices to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team repeated the test of a form with structured location choices to obtain very much stronger and more strong evidence.",
        },
        {
          isCorrect: false,
          label:
            "A repetition was repeated by the team for a form with structured location choices in order for evidence.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim mengulang kembali lagi uji formulir dengan pilihan lokasi yang terstruktur untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim melakukan pengulangan atas uji formulir dengan pilihan lokasi yang terstruktur dengan tujuan agar supaya dapat memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengulang uji formulir dengan pilihan lokasi yang terstruktur untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengulang uji formulir dengan pilihan lokasi yang terstruktur untuk memperoleh bukti yang lebih sangat kuat sekali.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan kembali dilakukan lagi oleh tim atas formulir dengan pilihan lokasi yang terstruktur untuk bukti.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
