import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Am Sensor trat eine Störung auf." },
        {
          isCorrect: true,
          label: "Die planmäßige tägliche Reinigung wurde nicht ausgelassen.",
        },
        { isCorrect: false, label: "Die Warnlampe leuchtete." },
        {
          isCorrect: false,
          label: "Auf dem Sensor blieben Rückstände zurück.",
        },
        {
          isCorrect: false,
          label: "Die planmäßige tägliche Reinigung wurde ausgelassen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "The sensor developed a fault." },
        {
          isCorrect: true,
          label: "The scheduled daily cleaning was not skipped.",
        },
        { isCorrect: false, label: "The warning light turned on." },
        { isCorrect: false, label: "Residue remained on the sensor." },
        {
          isCorrect: false,
          label: "The scheduled daily cleaning was skipped.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Sensor mengalami gangguan." },
        {
          isCorrect: true,
          label: "Pembersihan harian yang dijadwalkan tidak dilewatkan.",
        },
        { isCorrect: false, label: "Lampu peringatan menyala." },
        { isCorrect: false, label: "Residu tertinggal pada sensor." },
        {
          isCorrect: false,
          label: "Pembersihan harian yang dijadwalkan dilewatkan.",
        },
      ],
    },
  },
};

export default item;
