import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Baik letaknya untuk mendukung suatu tujuan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Disusun berdasarkan strategi militer" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Berkaitan langsung dengan catatan sejarah" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Mencakup seluruh kebudayaan yang ada" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Terpisah dari jalur perdagangan pesisir" },
          ],
        },
      ],
    },
  },
};

export default item;
