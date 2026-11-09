import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "spelling",
  },
  stimulus: "waste-bank",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Rp1.800,00 per kg",
        },
        {
          correct: false,
          label: "Rp. 1.800,00 per Kg",
        },
        {
          correct: false,
          label: "Rp 1.800,00,- per kg",
        },
        {
          correct: false,
          label: "Rp1.800,00 per Kg.",
        },
        {
          correct: false,
          label: "RP1.800,00 per KG",
        },
      ],
    },
  },
};

export default item;
