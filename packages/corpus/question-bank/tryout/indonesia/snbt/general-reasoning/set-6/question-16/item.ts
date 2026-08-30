import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Yogyakarta" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Lombok" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Manado" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Padang" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Bali" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: [{ kind: "text", text: "Yogyakarta" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Lombok" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Manado" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Padang" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Bali" }] },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: [{ kind: "text", text: "Yogyakarta" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Lombok" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Manado" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Padang" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Bali" }] },
      ],
    },
  },
};

export default item;
