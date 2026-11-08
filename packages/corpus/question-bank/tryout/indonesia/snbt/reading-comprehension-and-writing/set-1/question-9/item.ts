import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "sentence-core",
  },
  stimulus: "rooftop-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Gelas-gelas itu diletakkan pada pipa paralon.",
        },
        {
          correct: true,
          label: "Gelas-gelas itu diletakkan.",
        },
        {
          correct: false,
          label: "Pipa paralon dialiri larutan nutrisi.",
        },
        {
          correct: false,
          label: "Gelas-gelas dialiri larutan.",
        },
        {
          correct: false,
          label: "Larutan nutrisi diletakkan terus-menerus.",
        },
      ],
    },
  },
};

export default item;
