import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Jawa Barat" }] },
        { isCorrect: true, label: [{ kind: "text", text: "Jawa Tengah" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Jawa Timur" }] },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Nusa Tenggara Barat" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Sulawesi Selatan" }],
        },
      ],
    },
  },
};

export default item;
