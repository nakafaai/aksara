import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Mit geänderten Messregeln wird das Team die Symbole länger in mehreren Gruppen prüfen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird nur die Durchgänge mit den höchsten Ergebnissen für die neuen Symbole wiederholen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird die neuen Symbole dauerhaft einführen, statt einen Folgetest durchzuführen.",
        },
        {
          isCorrect: true,
          label:
            "Mit denselben Messregeln wird das Team die Symbole länger in mehreren Gruppen prüfen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird die Symbole länger in nur einer Gruppe ohne Vergleich prüfen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Using revised measurement rules, the team will test the symbols for longer across several groups.",
        },
        {
          isCorrect: false,
          label:
            "The team will repeat only the sessions that recorded the highest results for the new symbols.",
        },
        {
          isCorrect: false,
          label:
            "The team will adopt the new symbols permanently instead of conducting a follow-up test.",
        },
        {
          isCorrect: true,
          label:
            "Using the same measurement rules, the team will test the symbols for longer across several groups.",
        },
        {
          isCorrect: false,
          label:
            "The team will test the symbols for longer in just one group without a comparison.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dengan aturan pengukuran yang diubah, tim akan menguji simbol lebih lama pada beberapa kelompok.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya akan mengulang sesi yang mencatat hasil tertinggi untuk simbol baru.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan simbol baru secara permanen sebagai pengganti pengujian lanjutan.",
        },
        {
          isCorrect: true,
          label:
            "Dengan aturan pengukuran yang sama, tim akan menguji simbol lebih lama pada beberapa kelompok.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menguji simbol lebih lama pada satu kelompok saja tanpa pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
