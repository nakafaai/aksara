import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Mengutamakan kenyamanan kerja",
        },
        {
          correct: false,
          label: "Sangat teliti dan ulet",
        },
        {
          correct: true,
          label: "Berani mengambil risiko",
        },
        {
          correct: false,
          label: "Sosok yang rapi",
        },
        {
          correct: false,
          label: "Peduli terhadap kemanusiaan",
        },
      ],
    },
  },
};

export default item;
