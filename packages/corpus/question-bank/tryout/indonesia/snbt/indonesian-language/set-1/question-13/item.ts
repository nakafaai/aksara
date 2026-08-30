import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kalimat (1)" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kalimat (7)" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kalimat (3)" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Kalimat (10)" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kalimat (8)" }],
        },
      ],
    },
  },
};

export default item;
