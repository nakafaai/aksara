import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wiederholte erneut noch einmal den Versuch zu einen Rückgabecode an jedem Griff, um belastbarere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte eine Wiederholung des Versuchs zu einen Rückgabecode an jedem Griff mit dem Ziel durch, damit belastbarere Belege erhalten werden können.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Versuch zu einen Rückgabecode an jedem Griff, um sehr viel belastbarere stärkere Belege zu erhalten.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wiederholte den Versuch mit folgender Änderung, um belastbarere Belege zu erhalten: einen Rückgabecode an jedem Griff.",
        },
        {
          isCorrect: false,
          label:
            "Eine Wiederholung wurde vom Team erneut für einen Rückgabecode an jedem Griff durchgeführt, und zwar für Belege.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team repeated the test of a return code on each handle again once more to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team carried out a repetition of the test of a return code on each handle for the purpose of being able to obtain evidence that was stronger.",
        },
        {
          isCorrect: false,
          label:
            "The team repeated the test of a return code on each handle to obtain very much stronger and more strong evidence.",
        },
        {
          isCorrect: true,
          label:
            "The team repeated the test of a return code on each handle to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "A repetition was repeated by the team for a return code on each handle in order for evidence.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim mengulang kembali lagi uji kode pengembalian untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim melakukan pengulangan atas uji kode pengembalian dengan tujuan agar supaya dapat memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengulang uji kode pengembalian untuk memperoleh bukti yang lebih sangat kuat sekali.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengulang uji kode pengembalian untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan kembali dilakukan lagi oleh tim atas kode pengembalian untuk bukti.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
