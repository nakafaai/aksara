import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wiederholte erneut noch einmal den Versuch zu Genre-Schilder auf jedem Tisch, um belastbarere Belege zu erhalten.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wiederholte den Versuch mit folgender Änderung, um belastbarere Belege zu erhalten: Genre-Schilder auf jedem Tisch.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte eine Wiederholung des Versuchs zu Genre-Schilder auf jedem Tisch mit dem Ziel durch, damit belastbarere Belege erhalten werden können.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Versuch zu Genre-Schilder auf jedem Tisch, um sehr viel belastbarere stärkere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Eine Wiederholung wurde vom Team erneut für Genre-Schilder auf jedem Tisch durchgeführt, und zwar für Belege.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team repeated the test of genre signs on each table again once more to obtain stronger evidence.",
        },
        {
          isCorrect: true,
          label:
            "The team repeated the test of genre signs on each table to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team carried out a repetition of the test of genre signs on each table for the purpose of being able to obtain evidence that was stronger.",
        },
        {
          isCorrect: false,
          label:
            "The team repeated the test of genre signs on each table to obtain very much stronger and more strong evidence.",
        },
        {
          isCorrect: false,
          label:
            "A repetition was repeated by the team for genre signs on each table in order for evidence.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim mengulang kembali lagi uji tanda genre di setiap meja untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengulang uji tanda genre di setiap meja untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim melakukan pengulangan atas uji tanda genre di setiap meja dengan tujuan agar supaya dapat memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengulang uji tanda genre di setiap meja untuk memperoleh bukti yang lebih sangat kuat sekali.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan kembali dilakukan lagi oleh tim atas tanda genre di setiap meja untuk bukti.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
