import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "versorgt." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "aufgewacht." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "tief und fest schlafend." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "instand gehalten." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "geschützt." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "cared for." }] },
        { isCorrect: false, label: [{ kind: "text", text: "woken up." }] },
        { isCorrect: true, label: [{ kind: "text", text: "fast asleep." }] },
        { isCorrect: false, label: [{ kind: "text", text: "maintained." }] },
        { isCorrect: false, label: [{ kind: "text", text: "protected." }] },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "terawat." }] },
        { isCorrect: false, label: [{ kind: "text", text: "terbangun." }] },
        { isCorrect: true, label: [{ kind: "text", text: "terlelap." }] },
        { isCorrect: false, label: [{ kind: "text", text: "terpelihara." }] },
        { isCorrect: false, label: [{ kind: "text", text: "terlindungi." }] },
      ],
    },
  },
};

export default item;
