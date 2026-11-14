import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "scheduling",
  },
  stimulus: "budaya",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Wayang, gamelan, dongeng",
        },
        {
          correct: false,
          label: "Angklung, gamelan, dongeng",
        },
        {
          correct: false,
          label: "Batik, kuliner, dongeng",
        },
        {
          correct: false,
          label: "Wayang, angklung, dongeng",
        },
        {
          correct: false,
          label: "Wayang, dongeng, batik",
        },
      ],
    },
  },
};

export default item;
