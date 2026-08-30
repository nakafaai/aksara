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
          isCorrect: true,
          label: "tief und fest schlafend.",
        },
        {
          isCorrect: false,
          label: "aufgewacht.",
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
        { isCorrect: true, label: "fast asleep." },
        { isCorrect: false, label: "woken up." },
        { isCorrect: false, label: "maintained." },
        { isCorrect: false, label: "protected." },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "terawat." },
        { isCorrect: true, label: "terlelap." },
        { isCorrect: false, label: "terbangun." },
        { isCorrect: false, label: "terpelihara." },
        { isCorrect: false, label: "terlindungi." },
      ],
    },
  },
};

export default item;
