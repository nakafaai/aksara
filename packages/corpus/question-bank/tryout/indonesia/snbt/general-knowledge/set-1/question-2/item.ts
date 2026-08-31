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
          isCorrect: false,
          label: "instand gehalten.",
        },
        {
          isCorrect: false,
          label: "geschützt.",
        },
        {
          isCorrect: true,
          label: "tief und fest schlafend.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "cared for." },
        { isCorrect: false, label: "woken up." },
        { isCorrect: false, label: "maintained." },
        { isCorrect: false, label: "protected." },
        { isCorrect: true, label: "fast asleep." },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "terawat." },
        { isCorrect: false, label: "terbangun." },
        { isCorrect: false, label: "terpelihara." },
        { isCorrect: false, label: "terlindungi." },
        { isCorrect: true, label: "terlelap." },
      ],
    },
  },
};

export default item;
