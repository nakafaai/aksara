import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Nitrogen dan fosfor selalu merusak tanah dataran banjir",
        },
        {
          correct: false,
          label:
            "Dataran banjir hanya dapat melepas bahan dan tidak pernah menahannya",
        },
        {
          correct: true,
          label: "Dataran banjir dapat menahan sedimen dan unsur hara",
        },
        {
          correct: false,
          label:
            "Dataran banjir hanya menumpuk bahan dan tidak pernah kehilangannya akibat erosi",
        },
        {
          correct: false,
          label: "Setiap banjir membuat semua tanah dataran banjir lebih subur",
        },
      ],
    },
  },
};

export default item;
