import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Oktober" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "November" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Dezember" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Januar" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Februar" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "October" }] },
        { isCorrect: false, label: [{ kind: "text", text: "November" }] },
        { isCorrect: true, label: [{ kind: "text", text: "December" }] },
        { isCorrect: false, label: [{ kind: "text", text: "January" }] },
        { isCorrect: false, label: [{ kind: "text", text: "February" }] },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Oktober" }] },
        { isCorrect: false, label: [{ kind: "text", text: "November" }] },
        { isCorrect: true, label: [{ kind: "text", text: "Desember" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Januari" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Februari" }] },
      ],
    },
  },
};

export default item;
