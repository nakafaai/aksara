import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "versorgt.",
        },
        {
          isCorrect: false,
          label: "aufgewacht.",
        },
        {
          isCorrect: true,
          label: "tief und fest schlafend.",
        },
        {
          isCorrect: false,
          label: "instand gehalten.",
        },
        {
          isCorrect: false,
          label: "geschützt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "cared for." },
        { isCorrect: false, label: "woken up." },
        { isCorrect: true, label: "fast asleep." },
        { isCorrect: false, label: "maintained." },
        { isCorrect: false, label: "protected." },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "terawat." },
        { isCorrect: false, label: "terbangun." },
        { isCorrect: true, label: "terlelap." },
        { isCorrect: false, label: "terpelihara." },
        { isCorrect: false, label: "terlindungi." },
      ],
    },
  },
};

export default item;
