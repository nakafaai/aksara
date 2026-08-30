import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
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
          label: "Klasse C",
        },
        {
          isCorrect: true,
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
        { isCorrect: false, label: "Class A" },
        { isCorrect: false, label: "Class B" },
        { isCorrect: false, label: "Class C" },
        { isCorrect: true, label: "Class D" },
        { isCorrect: false, label: "Class E" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Kelas A" },
        { isCorrect: false, label: "Kelas B" },
        { isCorrect: false, label: "Kelas C" },
        { isCorrect: true, label: "Kelas D" },
        { isCorrect: false, label: "Kelas E" },
      ],
    },
  },
};

export default item;
