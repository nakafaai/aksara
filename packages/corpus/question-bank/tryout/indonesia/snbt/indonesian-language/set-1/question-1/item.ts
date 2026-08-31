import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mengutamakan kenyamanan kerja",
        },
        {
          isCorrect: false,
          label: "Sangat teliti dan ulet",
        },
        {
          isCorrect: true,
          label: "Berani mengambil risiko",
        },
        {
          isCorrect: false,
          label: "Sosok yang rapi",
        },
        {
          isCorrect: false,
          label: "Peduli terhadap kemanusiaan",
        },
      ],
    },
  },
};

export default item;
