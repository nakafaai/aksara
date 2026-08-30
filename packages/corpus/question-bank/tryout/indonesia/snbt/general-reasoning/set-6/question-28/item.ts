import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Nicht: die Probe beginnt.",
        },
        {
          isCorrect: false,
          label: "der Zeitplan gedruckt wird",
        },
        {
          isCorrect: false,
          label: "Nicht: das Manuskript genehmigt wird.",
        },
        {
          isCorrect: true,
          label: "die Probe beginnt",
        },
        {
          isCorrect: false,
          label: "Nicht: der Zeitplan gedruckt wird.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "It is not true that rehearsal begins.",
        },
        {
          isCorrect: false,
          label: "the schedule is printed",
        },
        {
          isCorrect: false,
          label: "It is not true that the manuscript is approved.",
        },
        {
          isCorrect: true,
          label: "rehearsal begins",
        },
        {
          isCorrect: false,
          label: "It is not true that the schedule is printed.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tidak benar bahwa latihan dimulai.",
        },
        {
          isCorrect: false,
          label: "jadwal dicetak",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa naskah disetujui.",
        },
        {
          isCorrect: true,
          label: "latihan dimulai",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa jadwal dicetak.",
        },
      ],
    },
  },
};

export default item;
