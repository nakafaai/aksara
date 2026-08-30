import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "SUSAHNYA" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "MENANGIS" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "SEMANGAT" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "BERSEDIH" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "UTBKSERU" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "SUSAHNYA" }] },
        { isCorrect: false, label: [{ kind: "text", text: "MENANGIS" }] },
        { isCorrect: false, label: [{ kind: "text", text: "SEMANGAT" }] },
        { isCorrect: false, label: [{ kind: "text", text: "BERSEDIH" }] },
        { isCorrect: true, label: [{ kind: "text", text: "UTBKSERU" }] },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "SUSAHNYA" }] },
        { isCorrect: false, label: [{ kind: "text", text: "MENANGIS" }] },
        { isCorrect: false, label: [{ kind: "text", text: "SEMANGAT" }] },
        { isCorrect: false, label: [{ kind: "text", text: "BERSEDIH" }] },
        { isCorrect: true, label: [{ kind: "text", text: "UTBKSERU" }] },
      ],
    },
  },
};

export default item;
