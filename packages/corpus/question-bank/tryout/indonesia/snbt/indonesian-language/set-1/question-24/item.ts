import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kalimat (6)" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kalimat (7)" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kalimat (8)" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kalimat (9)" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Kalimat (10)" }],
        },
      ],
    },
  },
};

export default item;
