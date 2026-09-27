import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Nitrogen dan fosfor selalu merusak tanah dataran banjir",
        },
        {
          isCorrect: false,
          label:
            "Dataran banjir hanya dapat melepas bahan dan tidak pernah menahannya",
        },
        {
          isCorrect: true,
          label: "Dataran banjir dapat menahan sedimen dan unsur hara",
        },
        {
          isCorrect: false,
          label:
            "Dataran banjir hanya menumpuk bahan dan tidak pernah kehilangannya akibat erosi",
        },
        {
          isCorrect: false,
          label: "Setiap banjir membuat semua tanah dataran banjir lebih subur",
        },
      ],
    },
  },
};

export default item;
