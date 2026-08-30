import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Ilmu" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Pengalaman" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Nasihat" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kesan" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Perasaan" }],
        },
      ],
    },
  },
};

export default item;
