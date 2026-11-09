import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "angklung",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "dipukul dengan tongkat",
        },
        {
          correct: false,
          label: "ditiup dengan kuat",
        },
        {
          correct: false,
          label: "dipetik dengan jari",
        },
        {
          correct: true,
          label: "digerakkan bolak-balik",
        },
        {
          correct: false,
          label: "diputar perlahan-lahan",
        },
      ],
    },
  },
};

export default item;
