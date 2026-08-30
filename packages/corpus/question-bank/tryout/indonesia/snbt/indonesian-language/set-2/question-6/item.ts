import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Komik dan novel" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Dongeng dan pengetahuan" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Cerita fiksi dan komik" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Dongeng dan penelitian" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Cerita fiksi dan keagamaan" }],
        },
      ],
    },
  },
};

export default item;
