import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "subak",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "berganti-ganti",
        },
        {
          correct: true,
          label: "bersamaan",
        },
        {
          correct: false,
          label: "bertahap",
        },
        {
          correct: false,
          label: "berulang-ulang",
        },
        {
          correct: false,
          label: "beraturan",
        },
      ],
    },
  },
};

export default item;
