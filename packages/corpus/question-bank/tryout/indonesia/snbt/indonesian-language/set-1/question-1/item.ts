import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Berani mengambil risiko" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Mengutamakan kenyamanan kerja" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Sangat teliti dan ulet" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Sosok yang rapi" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Peduli terhadap kemanusiaan" }],
        },
      ],
    },
  },
};

export default item;
