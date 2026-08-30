import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Klasse C",
        },
        {
          isCorrect: false,
          label: "Klasse A",
        },
        {
          isCorrect: false,
          label: "Klasse B",
        },
        {
          isCorrect: false,
          label: "Klasse D",
        },
        {
          isCorrect: false,
          label: "Klasse E",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "Class C" },
        { isCorrect: false, label: "Class A" },
        { isCorrect: false, label: "Class B" },
        { isCorrect: false, label: "Class D" },
        { isCorrect: false, label: "Class E" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "Kelas C" },
        { isCorrect: false, label: "Kelas A" },
        { isCorrect: false, label: "Kelas B" },
        { isCorrect: false, label: "Kelas D" },
        { isCorrect: false, label: "Kelas E" },
      ],
    },
  },
};

export default item;
