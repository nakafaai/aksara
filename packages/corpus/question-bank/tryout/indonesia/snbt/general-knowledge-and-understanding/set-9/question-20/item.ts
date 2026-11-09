import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "bambu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "keras dan tidak dapat ditekuk",
        },
        {
          correct: false,
          label: "berat dan sulit untuk diangkat",
        },
        {
          correct: false,
          label: "licin dan mudah tergelincir",
        },
        {
          correct: true,
          label: "dapat dibengkokkan tanpa patah",
        },
        {
          correct: false,
          label: "berongga di bagian dalamnya",
        },
      ],
    },
  },
};

export default item;
