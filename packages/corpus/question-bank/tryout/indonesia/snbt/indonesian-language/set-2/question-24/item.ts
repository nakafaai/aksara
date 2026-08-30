import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: [{ kind: "text", text: "Asia Selatan" }] },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Mediterania timur" }],
        },
        { isCorrect: false, label: [{ kind: "text", text: "Asia Tenggara" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Afrika Barat" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Eropa Utara" }] },
      ],
    },
  },
};

export default item;
