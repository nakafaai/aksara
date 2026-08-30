import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kalimat (13)" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Kalimat (9)" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kalimat (15)" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kalimat (7)" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kalimat (12)" }],
        },
      ],
    },
  },
};

export default item;
